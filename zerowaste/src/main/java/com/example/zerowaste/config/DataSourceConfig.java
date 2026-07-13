package com.example.zerowaste.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public DataSource dataSource(Environment env) {
        String databaseUrl = env.getProperty("DATABASE_URL");
        
        if (databaseUrl == null || databaseUrl.isEmpty()) {
            // Fallback to default for local development
            databaseUrl = "jdbc:postgresql://localhost:5432/zerowaste_connect";
        }

        HikariConfig config = new HikariConfig();
        
        // Parse and convert DATABASE_URL to JDBC format
        String jdbcUrl = convertToJdbcUrl(databaseUrl);
        config.setJdbcUrl(jdbcUrl);
        
        // Always try to extract credentials from URL first (for postgres:// format)
        boolean credentialsExtracted = false;
        if (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://")) {
            credentialsExtracted = extractCredentialsFromUrl(databaseUrl, config);
        }
        
        // If credentials not in URL, use separate environment variables
        if (!credentialsExtracted) {
            String username = env.getProperty("DATABASE_USERNAME");
            String password = env.getProperty("DATABASE_PASSWORD");
            
            if (username == null || username.isEmpty()) {
                throw new IllegalStateException("DATABASE_USERNAME environment variable must be set when DATABASE_URL does not contain embedded credentials");
            }
            if (password == null || password.isEmpty()) {
                throw new IllegalStateException("DATABASE_PASSWORD environment variable must be set when DATABASE_URL does not contain embedded credentials");
            }
            
            config.setUsername(username);
            config.setPassword(password);
        }
        
        // HikariCP settings optimized for Neon PostgreSQL
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        
        return new HikariDataSource(config);
    }

    private String convertToJdbcUrl(String databaseUrl) {
        // If already in JDBC format, return as-is
        if (databaseUrl.startsWith("jdbc:")) {
            return databaseUrl;
        }
        
        // Convert postgres:// or postgresql:// to jdbc:postgresql://
        try {
            URI uri = new URI(databaseUrl);
            
            // Extract components
            String scheme = uri.getScheme();
            String userInfo = uri.getUserInfo();
            String host = uri.getHost();
            int port = uri.getPort();
            String path = uri.getPath();
            String query = uri.getQuery();
            
            // Build JDBC URL
            StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://");
            jdbcUrl.append(host);
            
            // Add port if specified and not default
            if (port != -1 && port != 5432) {
                jdbcUrl.append(":").append(port);
            }
            
            // Add database name from path
            if (path != null && !path.isEmpty()) {
                // Remove leading slash if present
                if (path.startsWith("/")) {
                    path = path.substring(1);
                }
                jdbcUrl.append("/").append(path);
            }
            
            // Add query parameters if present (for SSL, etc.)
            if (query != null && !query.isEmpty()) {
                jdbcUrl.append("?").append(query);
            }
            
            return jdbcUrl.toString();
            
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("Invalid DATABASE_URL format: " + databaseUrl, e);
        }
    }

    private boolean extractCredentialsFromUrl(String databaseUrl, HikariConfig config) {
        try {
            URI uri = new URI(databaseUrl);
            String userInfo = uri.getUserInfo();
            
            if (userInfo != null && !userInfo.isEmpty()) {
                // userInfo format is "username:password"
                String[] parts = userInfo.split(":");
                if (parts.length >= 1) {
                    config.setUsername(parts[0]);
                }
                if (parts.length >= 2) {
                    config.setPassword(parts[1]);
                }
                return true;
            }
            return false;
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("Invalid DATABASE_URL format: " + databaseUrl, e);
        }
    }
}

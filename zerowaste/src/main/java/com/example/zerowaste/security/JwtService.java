package com.example.zerowaste.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String DEFAULT_SECRET = "ThisIsMySecretKeyForZeroWasteConnectProject123456";

    @Value("${jwt.secret:ThisIsMySecretKeyForZeroWasteConnectProject123456}")
    private String secret;

    @Value("${jwt.expiration:86400000}")
    private long expiration;

    private final Environment environment;
    private Key key;

    public JwtService(Environment environment) {
        this.environment = environment;
    }

    @PostConstruct
    public void init() {
        if (secret == null || secret.trim().isEmpty()) {
            throw new IllegalStateException("JWT_SECRET environment variable is not set. Please set JWT_SECRET to a secure random string of at least 32 characters.");
        }
        if (secret.length() < 32) {
            throw new IllegalStateException("JWT_SECRET must be at least 32 characters long for security. Current length: " + secret.length());
        }
        
        // Check if running in production (PORT is set by Render)
        String port = environment.getProperty("server.port");
        boolean isProduction = port != null && !port.equals("8081");
        
        // If in production and using default secret, fail
        if (isProduction && secret.equals(DEFAULT_SECRET)) {
            throw new IllegalStateException("JWT_SECRET environment variable must be set in production. Using default secret is not allowed for security reasons.");
        }
        
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generate JWT Token
    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    // Extract Email from Token
    public String extractEmail(String token) {

        Claims claims = Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    // Validate Token
    public boolean validateToken(String token, String email) {

        String userEmail = extractEmail(token);

        return userEmail.equals(email);
    }
}
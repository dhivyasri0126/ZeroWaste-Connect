package com.example.zerowaste.security;

import com.example.zerowaste.entity.User;
import com.example.zerowaste.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = repository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }

        // Debug messages
        System.out.println("=================================");
        System.out.println("Email       : " + user.getEmail());
        System.out.println("Role        : " + user.getRole());
        System.out.println("Authorities : " + user.getAuthorities());
        System.out.println("=================================");

        return user;
    }
}
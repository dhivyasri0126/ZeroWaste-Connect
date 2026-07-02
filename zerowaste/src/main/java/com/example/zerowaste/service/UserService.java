package com.example.zerowaste.service;

import com.example.zerowaste.entity.User;
import com.example.zerowaste.repository.UserRepository;
import com.example.zerowaste.security.JwtService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register User
    public String register(User user) {

        if (repository.findByEmail(user.getEmail()) != null) {
            return "Email Already Exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        repository.save(user);

        return "Registration Successful";
    }

    // Login User
    public String login(String email, String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        return jwtService.generateToken(email);
    }
        public List<User> getAllUsers() {
            return repository.findAll();
        }
}
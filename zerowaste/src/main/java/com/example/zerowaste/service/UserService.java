package com.example.zerowaste.service;

import com.example.zerowaste.entity.User;
import com.example.zerowaste.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User registerUser(User user) {

        User existingUser = repository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return null;
        }

        return repository.save(user);
    }

    public User loginUser(String email, String password) {

        User user = repository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }
}
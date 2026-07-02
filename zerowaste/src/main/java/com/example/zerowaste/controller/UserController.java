package com.example.zerowaste.controller;

import com.example.zerowaste.entity.User;
import com.example.zerowaste.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        User savedUser = service.registerUser(user);

        if (savedUser != null) {
            return "Registration Successful";
        } else {
            return "Email Already Exists";
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User loginUser = service.loginUser(user.getEmail(), user.getPassword());

        if (loginUser != null) {
            return loginUser.getRole();
        } else {
            return "Invalid Email or Password";
        }
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }
}
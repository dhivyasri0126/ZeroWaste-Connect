package com.example.zerowaste.controller;

import com.example.zerowaste.entity.User;
import com.example.zerowaste.repository.UserRepository;
import com.example.zerowaste.service.EmailService;
import com.example.zerowaste.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001","http://127.0.0.1:3000","http://127.0.0.1:3001"})
public class AuthController {

    @Autowired
    private UserService service;
    @Autowired
private UserRepository repository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return service.login(user.getEmail(), user.getPassword());
    }
    @Autowired
private EmailService emailService;
@GetMapping("/testmail")
public String testMail() {

    String html = """
    <html>
    <body>
        <h2 style="color:green;">ZeroWaste Connect</h2>
        <p>Your HTML Email API is working successfully.</p>
    </body>
    </html>
    """;

    emailService.sendHtmlEmail(
            "zerowasteconnect.project@gmail.com",
            "ZeroWaste Connect",
            html
    );

    return "Email Sent Successfully";
}
@GetMapping("/profile")
public User profile(Authentication authentication){

    String email=authentication.getName();

    return repository.findByEmail(email);

}
@PutMapping("/updateprofile")
public User updateProfile(@RequestBody User updatedUser,
                          Authentication authentication) {

    String email = authentication.getName();

    return service.updateProfile(email, updatedUser);

}
}

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
import com.example.zerowaste.util.EmailTemplate;

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

    @Autowired
    private EmailService emailService;

    // Register User
  public String register(User user) {

    if (repository.findByEmail(user.getEmail()) != null) {
        return "Email Already Exists";
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    repository.save(user);
   String html = EmailTemplate.welcomeEmail(
        user.getName(),
        user.getEmail()
);

emailService.sendHtmlEmail(
        user.getEmail(),
        "🎉 Welcome to ZeroWaste Connect",
        html
);

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
        public User updateProfile(String email, User updatedUser) {

    User user = repository.findByEmail(email);

    if(user == null){
        return null;
    }

    user.setName(updatedUser.getName());
    user.setPhone(updatedUser.getPhone());
    user.setAddress(updatedUser.getAddress());

    // Update password only if entered
    if(updatedUser.getPassword()!=null &&
       !updatedUser.getPassword().isBlank()){

        user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

    }

    return repository.save(user);

}
}
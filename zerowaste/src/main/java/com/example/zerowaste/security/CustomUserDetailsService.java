package com.example.zerowaste.security;

import com.example.zerowaste.entity.User;
import com.example.zerowaste.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
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

        return user;
    }
}
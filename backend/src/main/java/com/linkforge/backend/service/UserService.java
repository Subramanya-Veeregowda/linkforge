package com.linkforge.backend.service;

import com.linkforge.backend.model.User;
import com.linkforge.backend.repository.UserRepository;
import com.linkforge.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User register(User user) {

        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        String hashed = passwordEncoder.encode(user.getPassword());

        user.setPassword(hashed);

        return userRepository.save(user);
    }

    public String login(User user){
        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("user not found"));

        if(!passwordEncoder.matches(user.getPassword(),existingUser.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        String token = JwtUtil.generateToken(existingUser.getEmail());

        return token;
    }
}

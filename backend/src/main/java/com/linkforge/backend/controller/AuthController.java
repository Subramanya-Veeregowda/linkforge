package com.linkforge.backend.controller;

import com.linkforge.backend.model.User;
import com.linkforge.backend.service.UserService;
import com.linkforge.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

//        boolean isValid = userService.login(user);
//
//        if (!isValid) {
//            throw new RuntimeException("Invalid credentials");
//        }

        String token = jwtUtil.generateToken(user.getEmail());

        return Map.of("token", token);
    }

    @GetMapping("/secure/test")
    public String test(){
        return "Working";
    }
}

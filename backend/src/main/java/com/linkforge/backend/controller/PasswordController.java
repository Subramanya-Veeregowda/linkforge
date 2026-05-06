package com.linkforge.backend.controller;

import com.linkforge.backend.dto.ForgotPasswordRequest;
import com.linkforge.backend.dto.ResetPasswordRequest;
import com.linkforge.backend.service.EmailService;
import com.linkforge.backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private PasswordResetService resetService;

    @Autowired
    private EmailService emailService;

    @Value("${frontend.url")
    private String frontendUrl;

    // request reset
    @PostMapping("/forgot")
    public String forgotPassword(@RequestBody ForgotPasswordRequest request) {

        String token = resetService.createResetToken(request.getEmail());

        if(token != null) {
            // TODO: send email with link
            String resetLink = frontendUrl + "/reset?token=" + token;
            emailService.sendResetEmail(request.getEmail(), resetLink);
        }

        return "Reset email sent successfully";
    }

    // reset password
    @PostMapping("/reset")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {

        resetService.resetPassword(
                request.getToken(),
                request.getNewPassword()
        );

        return "Password reset successful";
    }
}


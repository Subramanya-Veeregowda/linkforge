package com.linkforge.backend.service;

import com.linkforge.backend.model.PasswordResetToken;
import com.linkforge.backend.model.User;
import com.linkforge.backend.repository.PasswordResetTokenRepository;
import com.linkforge.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${frontend.url}")
    private String frontendUrl;

    //  generate reset token
    public String createResetToken(String email) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return null; // silently ignore
        }

        User user = optionalUser.get();

        String rawToken = UUID.randomUUID().toString();

        String hashedToken = BCrypt.hashpw(rawToken, BCrypt.gensalt());

        PasswordResetToken token = new PasswordResetToken();
        token.setToken(hashedToken);
        token.setEmail(email);
        token.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        token.setUsed(false);

        String link = frontendUrl + "/reset?token=" + rawToken;

        tokenRepo.save(token);

        return rawToken; // send THIS in email
    }

    //  reset password
    public void resetPassword(String rawToken, String newPassword) {

        List<PasswordResetToken> tokens = tokenRepo.findAll();

        PasswordResetToken validToken = tokens.stream()
                .filter(t -> BCrypt.checkpw(rawToken, t.getToken()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (validToken.isUsed()) {
            throw new RuntimeException("Token already used");
        }

        if (validToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = userRepository.findByEmail(validToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        validToken.setUsed(true);
        tokenRepo.save(validToken);
    }
}


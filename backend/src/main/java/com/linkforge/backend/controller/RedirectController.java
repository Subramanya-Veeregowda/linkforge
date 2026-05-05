package com.linkforge.backend.controller;

import com.linkforge.backend.model.Link;
import com.linkforge.backend.service.LinkService;
import jakarta.servlet.http.HttpServletRequest; // Import this
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;

@RestController
public class RedirectController {

    private final LinkService linkService;

    // We keep this as a fallback, but we won't rely on it exclusively
    @Value("${frontend.url}")
    private String fallbackFrontendUrl;

    public RedirectController(LinkService linkService) {
        this.linkService = linkService;
    }

    @GetMapping("/api/{shortCode}")
    public ResponseEntity<?> redirect(
            @PathVariable String shortCode,
            @RequestParam(required = false) String password
    ) {
        try {
            Link link = linkService.getLink(shortCode);

            // 🔥 1. Expiry check FIRST
            if (link.getExpiryTime() != null &&
                    link.getExpiryTime().isBefore(java.time.LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.GONE).build(); // 410
            }

            // 🔥 2. Password check
            if (linkService.isProtected(link)) {
                if (password == null || password.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
                }

                boolean valid = linkService.verifyPassword(link, password);
                if (!valid) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
                }
            }

            // 🔥 3. Success → return URL (NOT redirect)
            String originalUrl = link.getOriginalUrl();
            return ResponseEntity.ok(originalUrl);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Helper method to get just the domain (e.g., https://myapp.vercel.app)
    private String extractBaseUrl(String url) {
        try {
            URI uri = new URI(url);
            return uri.getScheme() + "://" + uri.getHost() + (uri.getPort() != -1 ? ":" + uri.getPort() : "");
        } catch (Exception e) {
            return fallbackFrontendUrl;
        }
    }
}
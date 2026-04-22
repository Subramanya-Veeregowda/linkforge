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
import java.util.Map;

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
            @RequestParam(required = false) String password,
            HttpServletRequest request) {

        try {
            Link link = linkService.getLink(shortCode);

            // Check expiry first
            if (link.getExpiryTime() != null && link.getExpiryTime().isBefore(java.time.LocalDateTime.now())) {
                return ResponseEntity.ok(Map.of("status", "EXPIRED"));
            }

            // Verify password
            String originalUrl = linkService.getOriginalUrl(shortCode, password);

            // Return JSON instead of a 302 Redirect
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "url", originalUrl));

        } catch (ResponseStatusException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status", "INVALID_PASSWORD"));
            }
            // Handle GONE (Expired) status here too
            if (e.getStatusCode() == HttpStatus.GONE) {
                return ResponseEntity.ok(Map.of("status", "EXPIRED"));
            }
            throw e;
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
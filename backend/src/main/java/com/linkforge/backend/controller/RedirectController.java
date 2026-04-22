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
            @RequestParam(required = false) String password,
            HttpServletRequest request) { // Add HttpServletRequest here

        // 1. Determine the dynamic Frontend URL
        String referer = request.getHeader("Referer");
        String currentFrontendUrl = (referer != null) ? extractBaseUrl(referer) : fallbackFrontendUrl;

        try {
            Link link = linkService.getLink(shortCode);

            // 🔒 Redirect to Unlock Page
            if (linkService.isProtected(link) && (password == null || password.isEmpty())) {
                return ResponseEntity.status(HttpStatus.FOUND)
                        .location(URI.create(currentFrontendUrl + "/unlock/" + shortCode))
                        .build();
            }

            // 🔐 Verify + Redirect to Original Destination
            String originalUrl = linkService.getOriginalUrl(shortCode, password);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(originalUrl))
                    .build();

        } catch (ResponseStatusException e) {
            if (e.getStatusCode() == HttpStatus.GONE) {
                return ResponseEntity.status(HttpStatus.FOUND)
                        .location(URI.create(currentFrontendUrl + "/unlock/" + shortCode + "?expired=true"))
                        .build();
            }
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                return ResponseEntity.status(HttpStatus.FOUND)
                        .location(URI.create(currentFrontendUrl + "/unlock/" + shortCode + "?error=invalid"))
                        .build();
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
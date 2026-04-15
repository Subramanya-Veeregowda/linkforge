package com.linkforge.backend.controller;

import com.linkforge.backend.model.Link;
import com.linkforge.backend.service.LinkService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;

@RestController
    public class RedirectController {

        private final LinkService linkService;

        @Value("${frontend.url}")
        private String frontendUrl;

        public RedirectController(LinkService linkService) {
            this.linkService = linkService;
        }

        @GetMapping("/{shortCode}")
        public ResponseEntity<?> redirect(
                @PathVariable String shortCode,
                @RequestParam(required = false) String password) {

            try {

                Link link = linkService.getLink(shortCode);

                // 🔒 If password exists but NOT provided → go to unlock page
                if (linkService.isProtected(link) && (password==null || password.isEmpty())) {
                    return ResponseEntity.status(HttpStatus.FOUND)
                            .location(URI.create(frontendUrl + "/unlock/" + shortCode))
                            .build();
                }

                // 🔐 If password exists AND provided it verify + redirect
                if (link.getPasswordHash() != null && password != null && !password.isEmpty()) {

                    String originalUrl = linkService.getOriginalUrl(shortCode, password);

                    return ResponseEntity.status(HttpStatus.FOUND)
                            .location(URI.create(originalUrl))
                            .build();
                }

                String originalUrl = linkService.getOriginalUrl(shortCode, password);
                // 🌐 No password → direct redirect
                return ResponseEntity.status(HttpStatus.FOUND)
                        .location(URI.create(originalUrl))
                        .build();

            }catch (ResponseStatusException e) {

                if (e.getStatusCode() == HttpStatus.GONE) { // when link is 🔥 expired
                    return ResponseEntity.status(HttpStatus.FOUND)
                            .location(URI.create(frontendUrl + "/unlock/" + shortCode + "?expired=true"))
                            .build();
                }

                if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) { // when user enters 🔥 wrong password
                    return ResponseEntity.status(HttpStatus.FOUND)
                            .location(URI.create(frontendUrl + "/unlock/" + shortCode + "?error=invalid"))
                            .build();
                }

                throw e;
            }
        }
    }


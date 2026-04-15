package com.linkforge.backend.service;

import com.linkforge.backend.dto.CreateLinkRequest;
import com.linkforge.backend.dto.LinkStatusResponse;
import com.linkforge.backend.model.Link;
import com.linkforge.backend.repository.LinkRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class LinkService {

    @Value("${app.base-url}")
    private String baseUrl;

    private final LinkRepository linkRepository;

    private final BCryptPasswordEncoder encoder;

    private static final Logger log = LoggerFactory.getLogger(LinkService.class);

    @PostConstruct
    public void validateBaseUrl() {
        if (baseUrl == null || baseUrl.isEmpty()) {
            throw new IllegalStateException("APP_BASE_URL is not configured");
        }
    }

    public boolean isProtected(Link link) {
        return link.getPasswordHash() != null && !link.getPasswordHash().isEmpty();
    }

    public LinkService(LinkRepository linkRepository, BCryptPasswordEncoder encoder) {
        this.linkRepository = linkRepository;
        this.encoder = encoder;
    }

    private String generateShortCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder code = new StringBuilder();

        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            code.append(characters.charAt(random.nextInt(characters.length())));
        }

        return code.toString();
    }

    public String createShortLink(CreateLinkRequest request) {

        String shortCode;

        if (!isValidUrl(request.getOriginalUrl())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid URL");
        }

        if (request.getCustomCode() != null && !request.getCustomCode().isEmpty()) {
            shortCode = request.getCustomCode();
        } else {
            shortCode = generateShortCode();
        }

        if (linkRepository.existsByShortCode(shortCode)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Alias already taken");
        }

        Link link = new Link();
        link.setOriginalUrl(request.getOriginalUrl());
        link.setShortCode(shortCode);
        link.setClickCount(0L);
        link.setCreatedAt(LocalDateTime.now());

        if(request.getExpiryTime() != null){
            link.setExpiryTime(request.getExpiryTime());
        }

        if(request.getPassword() != null && !request.getPassword().isEmpty()){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            link.setPasswordHash(encoder.encode(request.getPassword()));
        }

        linkRepository.save(link);

        return baseUrl + "/" + shortCode;
    }

    private boolean isValidUrl(String url) {
        try {
            java.net.URL u = new java.net.URL(url);

            if (!u.getProtocol().equals("http") && !u.getProtocol().equals("https")) {
                return false;
            }

            if (u.getHost() == null || u.getHost().isEmpty()) {
                return false;
            }

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public String getOriginalUrl(String shortCode, String password) {

        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Link not found"));

        if(link.getPasswordHash() != null) {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            if(password == null || !encoder.matches(password, link.getPasswordHash())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
            }
        }

        if (link.getExpiryTime() != null &&
                link.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.GONE, "Link expired!");
        }

            link.setClickCount(link.getClickCount() + 1);

            linkRepository.save(link);

            return link.getOriginalUrl();
        }

    public Link getLink(String shortCode) {

        return linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("Link not found"));
    }

    public LinkStatusResponse getStatus(String shortCode) {
        Link link = linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("Not found"));

        if (link.getExpiryTime() != null &&
                link.getExpiryTime().isBefore(LocalDateTime.now())) {
            return new LinkStatusResponse("EXPIRED");
        }

        if (link.getPasswordHash() != null) {
            return new LinkStatusResponse("LOCKED");
        }

        return new LinkStatusResponse("ACTIVE");
    }
}

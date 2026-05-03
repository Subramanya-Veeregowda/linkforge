package com.linkforge.backend.controller;

import com.linkforge.backend.dto.CreateLinkRequest;
import com.linkforge.backend.dto.LinkResponse;
import com.linkforge.backend.dto.LinkStatusResponse;
import com.linkforge.backend.dto.QRResponse;
import com.linkforge.backend.model.Link;
import com.linkforge.backend.repository.LinkRepository;
import com.linkforge.backend.service.LinkService;
import com.linkforge.backend.service.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LinkController {

    private final LinkService linkService;

    @Autowired
    private QRService qrService;

    @Autowired
    private LinkRepository linkRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }

    @GetMapping("/test")
    public String test() {
        return "LinkForge backend is running";
    }

    @PostMapping("/links")
    public LinkResponse createLink(@RequestBody CreateLinkRequest request) {

        String shortUrl = linkService.createShortLink(request);

        return new LinkResponse(shortUrl);
    }

    @GetMapping("/qr/details/{shortCode}")
    public ResponseEntity<QRResponse> getQRDetails(@PathVariable String shortCode) throws Exception {

        Link link = linkService.getLink(shortCode);  // make sure this exists

        String url = baseUrl + "/" + shortCode;

        byte[] qrImage = qrService.generateQR(url);

        QRResponse response = new QRResponse();
        response.setUrl(url);
        response.setExpiry(
                link.getExpiryTime() != null ? link.getExpiryTime().toString() : null
        );
        response.setPasswordProtected(link.getPasswordHash() != null);
        response.setQrImage(
                Base64.getEncoder().encodeToString(qrImage)
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{shortCode}")
    public ResponseEntity<LinkStatusResponse> getStatus(@PathVariable String shortCode) {
        return ResponseEntity.ok(linkService.getStatus(shortCode));
    }

    @GetMapping("/db-check")
    public String checkDB() {
        try {
            long count = linkRepository.count();
            return "DB OK, count = " + count;
        } catch (Exception e) {
            return "DB ERROR: " + e.getMessage();
        }
    }
}
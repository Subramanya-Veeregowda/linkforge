package com.linkforge.backend.dto;

public class LinkResponse {

    private String shortUrl;

    private String title;

    public void setTitle(String title){ this.title = title; }

    public LinkResponse(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    public String getShortUrl() {
        return shortUrl;
    }
}
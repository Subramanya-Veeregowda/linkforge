package com.linkforge.backend.dto;

public class LinkStatusResponse {

    private String status;

    public LinkStatusResponse(String status){
        this.status = status;
    }

    public String getStatus(){
        return status;
    }
}

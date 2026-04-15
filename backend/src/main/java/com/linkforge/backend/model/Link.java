package com.linkforge.backend.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

   @Getter
   @Setter
   @Entity
   @Data
    public class Link {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String originalUrl;

        private String shortCode;

        private String customAlias;

        private String passwordHash;

        @Nullable
        private LocalDateTime expiryTime;

        private Long clickCount = 0L;

        private LocalDateTime createdAt;

        public LocalDateTime getExpiryTime(){
            return expiryTime;
        }

        public String getPasswordHash(){
            return passwordHash;
       }

    }


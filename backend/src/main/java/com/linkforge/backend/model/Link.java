package com.linkforge.backend.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
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

        @Column(nullable = false)
        private String title;

        public LocalDateTime getExpiryTime(){
            return expiryTime;
        }

        public String getPasswordHash(){
            return passwordHash;
        }

        public String getOriginalUrl(){
           return originalUrl;
        }

        public String getTitle(){
            return title;
        }

        public void setTitle(String title){
            this.title = title;
        }
    }


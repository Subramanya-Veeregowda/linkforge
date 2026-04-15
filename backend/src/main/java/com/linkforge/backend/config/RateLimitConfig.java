package com.linkforge.backend.config;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;

import java.time.Duration;

public class RateLimitConfig {

    public static Bucket createBucket() {

        Bandwidth limit = Bandwidth.classic(
                10,
                Refill.greedy(10, Duration.ofMinutes(1))
        );

        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
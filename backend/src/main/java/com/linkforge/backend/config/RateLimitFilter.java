package com.linkforge.backend.config;

import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RateLimitFilter implements Filter {

    private final Bucket bucket = RateLimitConfig.createBucket();

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String path = httpRequest.getRequestURI();

        System.out.println("Incoming path:" + path);

        // 🔥 Skip public endpoints
        if (
                path.equals("/api/auth/register") ||
                        path.equals("/api/auth/login") ||
                        path.startsWith("/api/password/")
        ) {
            chain.doFilter(request, response);
            return;
        }

        if(bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(429);
            httpResponse.getWriter().write("Too many requests");  // our rate limiter 🔥
        }
    }
}
package com.linkforge.backend.repository;

import com.linkforge.backend.model.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface LinkRepository extends JpaRepository<Link, Long> {

        Optional<Link> findByShortCode(String shortCode);

        Optional<Link> findByCustomAlias(String customAlias);

        boolean existsByShortCode(String shortCode);
}


package com.luizcasagrande.easycart.backend.repositories;

import com.luizcasagrande.easycart.backend.entities.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Page<Cart> findByUserId(Long userId, Pageable pageable);

    Optional<Cart> findByIdAndUserId(Long id, Long userId);
}

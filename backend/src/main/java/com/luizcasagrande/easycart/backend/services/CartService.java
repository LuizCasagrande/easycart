package com.luizcasagrande.easycart.backend.services;

import com.luizcasagrande.easycart.backend.entities.Cart;
import com.luizcasagrande.easycart.backend.repositories.CartRepository;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CartService implements CrudService<Cart> {

    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public JpaRepository<Cart, Long> getRepository() {
        return cartRepository;
    }

    @Override
    public Page<Cart> findAll(Pageable pageable) {
        var user = userService.getLoggedIn();
        return user.isManager()
                ? CrudService.super.findAll(pageable)
                : cartRepository.findByUserId(user.getId(), pageable);
    }

    @Override
    public Cart findById(Long id) {
        var user = userService.getLoggedIn();
        return user.isManager()
                ? CrudService.super.findById(id)
                : cartRepository.findByIdAndUserId(id, user.getId())
                  .orElseThrow(NoResultException::new);
    }

    @Override
    public Cart save(Cart entity) {
        var total = entity.getProducts().stream()
                .map(p -> p.getProduct().getPrice().multiply(p.getQuantity()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        entity.setTotal(total);
        entity.setDate(LocalDateTime.now());
        entity.setUser(userService.getLoggedIn());

        return CrudService.super.save(entity);
    }
}

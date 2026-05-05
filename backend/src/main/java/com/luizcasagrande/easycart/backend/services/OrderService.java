package com.luizcasagrande.easycart.backend.services;

import com.luizcasagrande.easycart.backend.entities.Order;
import com.luizcasagrande.easycart.backend.repositories.OrderRepository;
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
public class OrderService implements CrudService<Order> {

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Override
    public JpaRepository<Order, Long> getRepository() {
        return orderRepository;
    }

    @Override
    public Page<Order> findAll(Pageable pageable) {
        var user = userService.getLoggedIn();
        return user.isManager()
                ? CrudService.super.findAll(pageable)
                : orderRepository.findByUserId(user.getId(), pageable);
    }

    @Override
    public Order findById(Long id) {
        var user = userService.getLoggedIn();
        return user.isManager()
                ? CrudService.super.findById(id)
                : orderRepository.findByIdAndUserId(id, user.getId()).orElseThrow(NoResultException::new);
    }

    @Override
    public Order save(Order entity) {
        var total = entity.getProducts().stream()
                .map(op -> op.getProduct().getPrice().multiply(BigDecimal.valueOf(op.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        entity.setTotal(total);
        entity.setDate(LocalDateTime.now());
        entity.setUser(userService.getLoggedIn());

        return CrudService.super.save(entity);
    }
}

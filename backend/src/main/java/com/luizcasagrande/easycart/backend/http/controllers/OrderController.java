package com.luizcasagrande.easycart.backend.http.controllers;

import com.luizcasagrande.easycart.backend.entities.Order;
import com.luizcasagrande.easycart.backend.http.request.OrderRequest;
import com.luizcasagrande.easycart.backend.http.response.OrderResponse;
import com.luizcasagrande.easycart.backend.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final ModelMapper modelMapper;
    private final OrderService orderService;

    @GetMapping
    public Page<OrderResponse> findAll(Pageable pageable) {
        return orderService.findAll(pageable)
                .map(this::toResponse);
    }

    @GetMapping("{id}")
    public OrderResponse findById(@PathVariable Long id) {
        return toResponse(orderService.findById(id));
    }

    @Transactional(rollbackFor = Exception.class)
    @PostMapping
    public ResponseEntity<OrderResponse> save(@Valid @RequestBody OrderRequest orderRequest) {
        var order = modelMapper.map(orderRequest, Order.class);
        order = orderService.save(order);
        return status(CREATED).body(toResponse(order));
    }

    private OrderResponse toResponse(Order p) {
        return modelMapper.map(p, OrderResponse.class);
    }
}

package com.luizcasagrande.easycart.backend.http.controllers;

import com.luizcasagrande.easycart.backend.entities.Cart;
import com.luizcasagrande.easycart.backend.http.request.CartRequest;
import com.luizcasagrande.easycart.backend.http.response.CartResponse;
import com.luizcasagrande.easycart.backend.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final ModelMapper modelMapper;
    private final CartService cartService;

    @GetMapping
    public Page<CartResponse> findAll(Pageable pageable) {
        return cartService.findAll(pageable)
                .map(p -> modelMapper.map(p, CartResponse.class));
    }

    @GetMapping("{id}")
    public CartResponse findById(@PathVariable("id") Long id) {
        return modelMapper.map(cartService.findById(id), CartResponse.class);
    }

    @PostMapping
    public ResponseEntity<CartResponse> save(@Valid @RequestBody CartRequest productRequest) {
        var cart = modelMapper.map(productRequest, Cart.class);
        cart = cartService.save(cart);
        return ResponseEntity.status(CREATED)
                .body(modelMapper.map(cart, CartResponse.class));
    }
}

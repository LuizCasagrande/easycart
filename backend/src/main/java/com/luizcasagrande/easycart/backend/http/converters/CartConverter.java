package com.luizcasagrande.easycart.backend.http.converters;

import com.luizcasagrande.easycart.backend.entities.Cart;
import com.luizcasagrande.easycart.backend.entities.CartProduct;
import com.luizcasagrande.easycart.backend.http.request.CartRequest;
import com.luizcasagrande.easycart.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import java.util.Set;

import static java.util.Objects.requireNonNullElse;
import static java.util.stream.Collectors.toSet;

@Component
@RequiredArgsConstructor
public class CartConverter implements Converter<CartRequest, Cart> {

    private final ProductService productService;

    @Override
    public Cart convert(MappingContext<CartRequest, Cart> context) {
        var cart = requireNonNullElse(context.getDestination(), new Cart());
        var cartRequest = context.getSource();

        cart.setPaymentMethod(cartRequest.getPaymentMethod());
        cart.getProducts().addAll(convertProducts(cart, cartRequest));

        return cart;
    }

    private Set<CartProduct> convertProducts(Cart cart, CartRequest cartRequest) {
        var quantityPerProduct = cartRequest.getQuantityPerProduct();
        var products = productService.findByIdIn(quantityPerProduct.keySet());

        return products.stream()
                .map(p -> new CartProduct(quantityPerProduct.get(p.getId()), p, cart))
                .collect(toSet());
    }
}

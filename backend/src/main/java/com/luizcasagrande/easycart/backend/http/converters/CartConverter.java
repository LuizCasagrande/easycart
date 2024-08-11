package com.luizcasagrande.easycart.backend.http.converters;

import com.luizcasagrande.easycart.backend.entities.Cart;
import com.luizcasagrande.easycart.backend.entities.CartProduct;
import com.luizcasagrande.easycart.backend.entities.Product;
import com.luizcasagrande.easycart.backend.http.request.CartRequest;
import com.luizcasagrande.easycart.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;

import static java.util.Objects.requireNonNullElse;
import static java.util.stream.Collectors.toSet;

@Component
@RequiredArgsConstructor
public class CartConverter implements Converter<CartRequest, Cart> {

    private final ProductService productService;

    @Override
    public Cart convert(MappingContext<CartRequest, Cart> context) {
        Cart cart = requireNonNullElse(context.getDestination(), new Cart());
        CartRequest request = context.getSource();

        cart.setPaymentMethod(request.getPaymentMethod());
        cart.getProducts().addAll(convertProducts(cart, request));

        return cart;
    }

    private Set<CartProduct> convertProducts(Cart cart, CartRequest request) {
        Map<Long, BigDecimal> quantityPerProduct = request.getQuantityPerProduct();
        Set<Product> products = productService.findByIdIn(quantityPerProduct.keySet());

        return products.stream()
                .map(p -> new CartProduct(quantityPerProduct.get(p.getId()), p, cart))
                .collect(toSet());
    }
}

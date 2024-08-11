package com.luizcasagrande.easycart.backend.http.response;

import com.luizcasagrande.easycart.backend.entities.enums.CartPaymentMethod;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class CartResponse {

    private Long id;
    private LocalDateTime date;
    private BigDecimal total;
    private CartPaymentMethod paymentMethod;
    private UserResponse user;
    private Set<CartProductResponse> products;
}

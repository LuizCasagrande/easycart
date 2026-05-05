package com.luizcasagrande.easycart.backend.http.response;

import com.luizcasagrande.easycart.backend.entities.enums.OrderPaymentMethod;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class OrderResponse {

    private Long id;
    private LocalDateTime date;
    private BigDecimal total;
    private OrderPaymentMethod paymentMethod;
    private UserResponse user;
    private Set<OrderProductResponse> products;
}

package com.luizcasagrande.easycart.backend.http.request;

import com.luizcasagrande.easycart.backend.entities.enums.CartPaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

@Getter
@Setter
public class CartRequest {

    @NotNull
    private CartPaymentMethod paymentMethod;

    @NotEmpty
    private Map<Long, BigDecimal> quantityPerProduct;
}

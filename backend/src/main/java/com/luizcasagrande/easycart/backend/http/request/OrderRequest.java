package com.luizcasagrande.easycart.backend.http.request;

import com.luizcasagrande.easycart.backend.entities.enums.OrderPaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class OrderRequest {

    @NotNull
    private OrderPaymentMethod paymentMethod;

    @NotEmpty
    private Map<Long, Integer> quantityPerProduct;
}

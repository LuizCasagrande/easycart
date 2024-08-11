package com.luizcasagrande.easycart.backend.http.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CartProductResponse {

    private BigDecimal quantity;
    private ProductResponse product;
}

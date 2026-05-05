package com.luizcasagrande.easycart.backend.http.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductResponse extends ProductResponse {

    private Integer quantity;
}

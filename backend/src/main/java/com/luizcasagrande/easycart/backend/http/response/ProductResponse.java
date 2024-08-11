package com.luizcasagrande.easycart.backend.http.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductResponse {

    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String category;
    private String image;
}

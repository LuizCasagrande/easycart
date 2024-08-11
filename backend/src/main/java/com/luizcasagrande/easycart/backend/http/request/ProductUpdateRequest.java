package com.luizcasagrande.easycart.backend.http.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductUpdateRequest {

    @NotBlank
    private String description;

    @NotNull
    private BigDecimal price;

    @NotBlank
    private String category;

    @NotBlank
    private String image;
}

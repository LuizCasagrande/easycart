package com.luizcasagrande.easycart.backend.http.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddressRequest {

    @NotBlank
    private String number;

    @NotBlank
    private String street;

    @NotBlank
    private String city;

    @NotBlank
    private String zipcode;
}

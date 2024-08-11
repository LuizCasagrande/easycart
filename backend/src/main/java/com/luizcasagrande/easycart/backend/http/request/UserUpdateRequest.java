package com.luizcasagrande.easycart.backend.http.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @Valid
    @NotNull
    private UserAddressRequest address;
}

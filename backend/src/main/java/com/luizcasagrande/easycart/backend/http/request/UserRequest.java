package com.luizcasagrande.easycart.backend.http.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @Size(min = 6)
    @NotBlank
    private String password;

    @NotBlank
    private String phone;

    @Valid
    @NotNull
    private UserAddressRequest address;
}

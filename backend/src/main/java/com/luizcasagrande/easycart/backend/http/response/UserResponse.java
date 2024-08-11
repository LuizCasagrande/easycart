package com.luizcasagrande.easycart.backend.http.response;

import com.luizcasagrande.easycart.backend.entities.enums.UserType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserType type;
    private UserAddressResponse address;
}

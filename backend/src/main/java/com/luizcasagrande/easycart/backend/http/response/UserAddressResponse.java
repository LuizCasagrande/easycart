package com.luizcasagrande.easycart.backend.http.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddressResponse {

    private String number;
    private String street;
    private String city;
    private String zipcode;
}

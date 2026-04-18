package com.luizcasagrande.easycart.backend.http.converters;

import com.luizcasagrande.easycart.backend.entities.User;
import com.luizcasagrande.easycart.backend.entities.UserAddress;
import com.luizcasagrande.easycart.backend.http.request.UserRequest;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import static java.util.Objects.requireNonNullElse;

@Component
public class UserConverter implements Converter<UserRequest, User> {

    @Override
    public User convert(MappingContext<UserRequest, User> context) {
        var user = requireNonNullElse(context.getDestination(), new User());
        var userRequest = context.getSource();

        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setPhone(userRequest.getPhone());
        user.setAddress(convertAddress(user, userRequest));

        return user;
    }

    private UserAddress convertAddress(User user, UserRequest userRequest) {
        var address = requireNonNullElse(user.getAddress(), new UserAddress());
        var addressRequest = userRequest.getAddress();

        address.setCity(addressRequest.getCity());
        address.setStreet(addressRequest.getStreet());
        address.setNumber(addressRequest.getNumber());
        address.setZipcode(addressRequest.getZipcode());
        address.setUser(user);

        return address;
    }
}

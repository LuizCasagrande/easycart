package com.luizcasagrande.easycart.backend.http.controllers;

import com.luizcasagrande.easycart.backend.entities.User;
import com.luizcasagrande.easycart.backend.http.request.UserRequest;
import com.luizcasagrande.easycart.backend.http.request.UserUpdateRequest;
import com.luizcasagrande.easycart.backend.http.response.UserResponse;
import com.luizcasagrande.easycart.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("v1/user")
@RequiredArgsConstructor
public class UserController {

    private final ModelMapper modelMapper;
    private final UserService userService;

    @PostMapping("register")
    public ResponseEntity<UserResponse> save(@RequestBody UserRequest userRequest) {
        var user = modelMapper.map(userRequest, User.class);
        user = userService.save(user);
        return ResponseEntity.status(CREATED)
                .body(modelMapper.map(user, UserResponse.class));
    }

    @GetMapping("logged-in")
    public ResponseEntity<UserResponse> getLoggedIn() {
        return ResponseEntity.ok(modelMapper.map(userService.getLoggedIn(), UserResponse.class));
    }

    @PutMapping("logged-in")
    public ResponseEntity<UserResponse> update(@Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        var user = userService.getLoggedIn();
        modelMapper.map(userUpdateRequest, user);
        user = userService.save(user);
        return ResponseEntity.status(OK)
                .body(modelMapper.map(user, UserResponse.class));
    }
}

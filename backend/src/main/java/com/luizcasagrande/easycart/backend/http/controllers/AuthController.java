package com.luizcasagrande.easycart.backend.http.controllers;

import com.luizcasagrande.easycart.backend.http.request.AuthRequest;
import com.luizcasagrande.easycart.backend.http.response.AuthResponse;
import com.luizcasagrande.easycart.backend.services.JwtTokenService;
import com.luizcasagrande.easycart.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenService jwtTokenService;

    @PostMapping
    public AuthResponse authenticate(@Valid @RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.email(), authRequest.password()));

        var user = userService.loadUserByUsername(authRequest.email());
        return new AuthResponse(jwtTokenService.generateToken(user));
    }
}

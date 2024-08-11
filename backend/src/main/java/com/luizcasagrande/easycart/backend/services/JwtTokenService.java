package com.luizcasagrande.easycart.backend.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Log4j2
@Service
public class JwtTokenService {

    private static final Duration JWT_TOKEN_VALIDITY = Duration.ofHours(2);

    private final Algorithm hmac512;
    private final JWTVerifier verifier;

    public JwtTokenService(@Value("${jwt.secret}") String secret) {
        this.hmac512 = Algorithm.HMAC512(secret);
        this.verifier = JWT.require(hmac512).build();
    }

    public String generateToken(UserDetails user) {
        var now = Instant.now();
        return JWT.create()
                .withSubject(user.getUsername())
                .withIssuer("EasyCart")
                .withIssuedAt(now)
                .withExpiresAt(now.plusMillis(JWT_TOKEN_VALIDITY.toMillis()))
                .sign(hmac512);
    }

    public String validateTokenAndGetUsername(String token) {
        try {
            return verifier.verify(token).getSubject();
        } catch (JWTVerificationException e) {
            log.warn("Token invalid: {}", e.getMessage());
            return null;
        }
    }
}

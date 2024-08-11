package com.luizcasagrande.easycart.backend.config;

import jakarta.persistence.NoResultException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@ControllerAdvice
public class ExceptionHandlerConfig {

    @ResponseBody
    @ExceptionHandler(NoResultException.class)
    @ResponseStatus(NOT_FOUND)
    public Error handleNoResultException(WebRequest request) {
        return new Error("Record not found", request.getDescription(false));
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(BAD_REQUEST)
    public Error handleMethodArgumentTypeMismatchException(WebRequest request) {
        return new Error("Invalid parameter", request.getDescription(false));
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(BAD_REQUEST)
    public Error handleMethodArgumentNotValidException(MethodArgumentNotValidException e, WebRequest request) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(f -> f.getField() + " " + f.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return new Error(message, request.getDescription(false));
    }

    @ResponseBody
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(UNAUTHORIZED)
    public Error handleBadCredentialsException(BadCredentialsException e, WebRequest request) {
        return new Error(e.getMessage(), request.getDescription(false));
    }

    @ResponseBody
    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public Error handleException(Exception e, WebRequest request) {
        return new Error(e.getMessage(), request.getDescription(false));
    }

    public record Error(String message, String path) {
    }
}

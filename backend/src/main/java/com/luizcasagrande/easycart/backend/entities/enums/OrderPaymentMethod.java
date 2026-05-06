package com.luizcasagrande.easycart.backend.entities.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum OrderPaymentMethod {

    PIX("Pix"),
    BANK_SLIP("Boleto Bancário"),
    CREDIT_CARD("Cartão de Crédito");

    @Getter
    private final String description;
}

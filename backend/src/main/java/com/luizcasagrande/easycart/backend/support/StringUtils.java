package com.luizcasagrande.easycart.backend.support;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class StringUtils {

    public static final NumberFormat NUMBER_FORMATTER = NumberFormat.getCurrencyInstance(Locale.of("pt", "BR"));
    public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static String formatPrice(BigDecimal price) {
        return NUMBER_FORMATTER.format(price);
    }

    public static String formatDate(LocalDateTime date) {
        return DATE_FORMATTER.format(date);
    }
}

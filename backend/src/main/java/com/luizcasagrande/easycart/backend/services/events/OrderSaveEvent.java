package com.luizcasagrande.easycart.backend.services.events;

import com.luizcasagrande.easycart.backend.entities.Order;

public record OrderSaveEvent(Order order) {
}

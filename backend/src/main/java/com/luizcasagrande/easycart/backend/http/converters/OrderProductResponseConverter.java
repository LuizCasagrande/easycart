package com.luizcasagrande.easycart.backend.http.converters;

import com.luizcasagrande.easycart.backend.entities.OrderProduct;
import com.luizcasagrande.easycart.backend.http.response.OrderProductResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import static java.util.Objects.requireNonNullElse;

@Component
@RequiredArgsConstructor
public class OrderProductResponseConverter implements Converter<OrderProduct, OrderProductResponse> {

    @Override
    public OrderProductResponse convert(MappingContext<OrderProduct, OrderProductResponse> context) {
        var orderProductResponse = requireNonNullElse(context.getDestination(), new OrderProductResponse());
        var orderProduct = context.getSource();

        orderProductResponse.setId(orderProduct.getId());
        orderProductResponse.setTitle(orderProduct.getProduct().getTitle());
        orderProductResponse.setDescription(orderProduct.getProduct().getDescription());
        orderProductResponse.setPrice(orderProduct.getProduct().getPrice());
        orderProductResponse.setCategory(orderProduct.getProduct().getCategory());
        orderProductResponse.setImage(orderProduct.getProduct().getImage());
        orderProductResponse.setQuantity(orderProduct.getQuantity());

        return orderProductResponse;
    }
}

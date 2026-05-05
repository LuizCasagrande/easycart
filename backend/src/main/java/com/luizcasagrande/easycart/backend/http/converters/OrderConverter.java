package com.luizcasagrande.easycart.backend.http.converters;

import com.luizcasagrande.easycart.backend.entities.Order;
import com.luizcasagrande.easycart.backend.entities.OrderProduct;
import com.luizcasagrande.easycart.backend.http.request.OrderRequest;
import com.luizcasagrande.easycart.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.Objects.requireNonNullElse;

@Component
@RequiredArgsConstructor
public class OrderConverter implements Converter<OrderRequest, Order> {

    private final ProductService productService;

    @Override
    public Order convert(MappingContext<OrderRequest, Order> context) {
        var order = requireNonNullElse(context.getDestination(), new Order());
        var orderRequest = context.getSource();

        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.getProducts().addAll(convertProducts(order, orderRequest));

        return order;
    }

    private List<OrderProduct> convertProducts(Order order, OrderRequest orderRequest) {
        var quantityPerProduct = orderRequest.getQuantityPerProduct();
        var products = productService.findByIdIn(quantityPerProduct.keySet());

        return products.stream()
                .map(p -> new OrderProduct(quantityPerProduct.get(p.getId()), p, order))
                .toList();
    }
}

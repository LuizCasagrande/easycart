package com.luizcasagrande.easycart.backend.services.events.listeners;

import com.luizcasagrande.easycart.backend.entities.Order;
import com.luizcasagrande.easycart.backend.services.EmailService;
import com.luizcasagrande.easycart.backend.services.events.OrderSaveEvent;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import static com.luizcasagrande.easycart.backend.support.StringUtils.formatDate;
import static com.luizcasagrande.easycart.backend.support.StringUtils.formatPrice;
import static java.lang.String.format;
import static java.util.stream.Collectors.joining;
import static org.springframework.transaction.event.TransactionPhase.AFTER_COMMIT;

@Component
@AllArgsConstructor
public class OrderSaveSendEmailListener {

    private static final String EMAIL_SUBJECT = "EasyCart - Recebemos seu pedido #%s";
    private static final String EMAIL_TEXT_TEMPLATE = """
            Olá, %s!
            
            Seu pedido foi realizado com sucesso! 🎉
            
            📦 Detalhes:
            Número: #%s
            Data: %s
            
            🛍️ Itens:
            %s
            
            💳 Pagamento:
            %s
            
            🚚 Entrega:
            %s
            
            💰 Total: R$ %s
            
            Obrigado pela compra!
            """;

    private final EmailService emailService;

    @Async
    @TransactionalEventListener(phase = AFTER_COMMIT)
    public void orderSaveSendEmail(OrderSaveEvent event) {
        var order = event.order();

        emailService.sendEmail(order.getUser().getEmail(),
                format(EMAIL_SUBJECT, order.getId()),
                buildEmailText(order));
    }

    private String buildEmailText(Order order) {
        String products = order.getProducts().stream()
                .map(orderProduct -> format("- (x%s) %s - %s",
                        orderProduct.getQuantity(),
                        orderProduct.getProduct().getTitle(),
                        formatPrice(orderProduct.getProduct().getPrice())))
                .collect(joining("\n"));

        var address = order.getUser().getAddress();

        return format(EMAIL_TEXT_TEMPLATE,
                order.getUser().getName(),
                order.getId(),
                formatDate(order.getDate()),
                products,
                order.getPaymentMethod().getDescription(),
                format("%s %s, %s - %s",
                        address.getStreet(),
                        address.getNumber(),
                        address.getCity(),
                        address.getZipcode()),
                order.getTotal()
        );
    }
}

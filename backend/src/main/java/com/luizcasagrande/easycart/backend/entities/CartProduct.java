package com.luizcasagrande.easycart.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;

import static java.util.Objects.requireNonNull;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private BigDecimal quantity;

    @Setter
    @ManyToOne
    @JoinColumn(nullable = false)
    private Product product;

    @Setter
    @JsonBackReference
    @ManyToOne
    @JoinColumn(nullable = false)
    private Cart cart;

    public CartProduct(@NonNull BigDecimal quantity,
                       @NonNull Product product,
                       @NonNull Cart cart) {
        this.quantity = requireNonNull(quantity);
        this.product = requireNonNull(product);
        this.cart = requireNonNull(cart);
    }
}

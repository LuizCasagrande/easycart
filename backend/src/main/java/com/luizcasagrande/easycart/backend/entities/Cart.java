package com.luizcasagrande.easycart.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.luizcasagrande.easycart.backend.entities.enums.CartPaymentMethod;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@EqualsAndHashCode(of = "id")
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private LocalDateTime date;

    @Setter
    @Column(nullable = false)
    private BigDecimal total;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CartPaymentMethod paymentMethod;

    @Setter
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @Setter
    @JsonManagedReference
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartProduct> products = new HashSet<>();
}

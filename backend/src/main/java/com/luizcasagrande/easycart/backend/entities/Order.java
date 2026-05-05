package com.luizcasagrande.easycart.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.luizcasagrande.easycart.backend.entities.enums.OrderPaymentMethod;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@EqualsAndHashCode(of = "id")
@Entity(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private LocalDateTime date;

    @Setter
    @Column(nullable = false)
    private BigDecimal total;

    @Setter
    @Enumerated(STRING)
    @Column(nullable = false)
    private OrderPaymentMethod paymentMethod;

    @Setter
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @Setter
    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = ALL, orphanRemoval = true)
    private Set<OrderProduct> products = new HashSet<>();
}

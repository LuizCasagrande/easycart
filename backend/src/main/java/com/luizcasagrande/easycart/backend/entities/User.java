package com.luizcasagrande.easycart.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.luizcasagrande.easycart.backend.entities.enums.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

import static com.luizcasagrande.easycart.backend.entities.enums.UserType.MANAGER;
import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static java.lang.String.format;

@Getter
@EqualsAndHashCode(of = "id")
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String name;

    @Setter
    @Column(nullable = false, unique = true)
    private String email;

    @Setter
    @Column(nullable = false)
    private String password;

    @Setter
    @Column(nullable = false)
    private String phone;

    @Setter
    @Enumerated(STRING)
    @Column(nullable = false)
    private UserType type;

    @Setter
    @JsonManagedReference
    @OneToOne(mappedBy = "user", cascade = ALL, optional = false)
    @JoinColumn(nullable = false)
    private UserAddress address;

    @NonNull
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(format("ROLE_%s", type.name())));
    }

    @NonNull
    @Override
    public String getUsername() {
        return email;
    }

    public boolean isManager() {
        return MANAGER == type;
    }
}

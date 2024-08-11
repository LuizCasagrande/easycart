package com.luizcasagrande.easycart.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.luizcasagrande.easycart.backend.entities.enums.UserType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@EqualsAndHashCode(of = "id")
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType type;

    @Setter
    @JsonManagedReference
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = false)
    @JoinColumn(nullable = false)
    private UserAddress address;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(String.format("ROLE_%s", type.name())));
    }

    @Override
    public String getUsername() {
        return email;
    }

    public boolean isManager() {
        return UserType.MANAGER == type;
    }
}

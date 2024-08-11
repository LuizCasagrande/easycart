package com.luizcasagrande.easycart.backend.services;

import com.luizcasagrande.easycart.backend.entities.User;
import com.luizcasagrande.easycart.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.luizcasagrande.easycart.backend.entities.enums.UserType.CUSTOMER;

@Service
@RequiredArgsConstructor
public class UserService implements CrudService<User>, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public JpaRepository<User, Long> getRepository() {
        return userRepository;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User %s not found", email)));
    }

    @Override
    public User save(User entity) {
        entity.setType(CUSTOMER);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        return CrudService.super.save(entity);
    }

    public User getLoggedIn() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}

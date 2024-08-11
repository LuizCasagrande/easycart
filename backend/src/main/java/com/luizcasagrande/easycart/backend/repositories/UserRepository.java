package com.luizcasagrande.easycart.backend.repositories;

import com.luizcasagrande.easycart.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}

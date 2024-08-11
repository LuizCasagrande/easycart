package com.luizcasagrande.easycart.backend.repositories;

import com.luizcasagrande.easycart.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p.category from Product p")
    Set<String> findAllCategories();

    Page<Product> findByCategory(String category, Pageable pageable);

    Set<Product> findByIdIn(Set<Long> id);
}

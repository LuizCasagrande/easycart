package com.luizcasagrande.easycart.backend.services;

import com.luizcasagrande.easycart.backend.entities.Product;
import com.luizcasagrande.easycart.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductService implements CrudService<Product> {

    private final ProductRepository productRepository;

    @Override
    public JpaRepository<Product, Long> getRepository() {
        return productRepository;
    }

    public Set<String> findAllCategories() {
        return productRepository.findAllCategories();
    }

    public Page<Product> findByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    public Set<Product> findByIdIn(Set<Long> id) {
        return productRepository.findByIdIn(id);
    }
}

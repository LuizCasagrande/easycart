package com.luizcasagrande.easycart.backend.services;

import com.luizcasagrande.easycart.backend.entities.Product;
import com.luizcasagrande.easycart.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
@RequiredArgsConstructor
public class ProductService implements CrudService<Product> {

    private final ProductRepository productRepository;

    @Override
    public JpaRepository<Product, Long> getRepository() {
        return productRepository;
    }

    public Page<Product> findAll(String query, Pageable pageable) {
        if (isNotBlank(query)) {
            return productRepository.findAll(query, pageable);
        }
        return CrudService.super.findAll(pageable);
    }

    public Set<Product> findByIdIn(Set<Long> id) {
        return productRepository.findByIdIn(id);
    }

    public Set<String> findAllCategories() {
        return productRepository.findAllCategories();
    }

    public Page<Product> findByCategoryIn(Set<String> categories, Pageable pageable) {
        return productRepository.findByCategoryIn(categories, pageable);
    }
}

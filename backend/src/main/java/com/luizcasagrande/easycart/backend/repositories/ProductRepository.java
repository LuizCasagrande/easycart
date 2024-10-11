package com.luizcasagrande.easycart.backend.repositories;

import com.luizcasagrande.easycart.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
            select
            	p
            from
            	Product p
            where
            	cast(p.id as string) ilike concat('%', :query, '%')
            	or p.title ilike concat('%', :query, '%')
            """)
    Page<Product> findAll(@Param("query") String query, Pageable pageable);

    Set<Product> findByIdIn(Set<Long> id);

    @Query("select p.category from Product p")
    Set<String> findAllCategories();

    Page<Product> findByCategoryIn(Set<String> categories, Pageable pageable);
}

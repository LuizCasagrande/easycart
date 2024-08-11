package com.luizcasagrande.easycart.backend.services;

import jakarta.persistence.NoResultException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrudService<T> {

    JpaRepository<T, Long> getRepository();

    default Page<T> findAll(Pageable pageable) {
        return getRepository().findAll(pageable);
    }

    default T findById(Long id) {
        return getRepository().findById(id)
                .orElseThrow(NoResultException::new);
    }

    default T save(T entity) {
        return getRepository().save(entity);
    }

    default void delete(Long id) {
        if (getRepository().existsById(id)) {
            getRepository().deleteById(id);
        }
    }
}

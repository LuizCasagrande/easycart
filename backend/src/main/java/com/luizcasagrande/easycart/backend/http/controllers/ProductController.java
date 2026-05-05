package com.luizcasagrande.easycart.backend.http.controllers;

import com.luizcasagrande.easycart.backend.config.security.AuthorizeOnlyManager;
import com.luizcasagrande.easycart.backend.entities.Product;
import com.luizcasagrande.easycart.backend.http.request.ProductRequest;
import com.luizcasagrande.easycart.backend.http.request.ProductUpdateRequest;
import com.luizcasagrande.easycart.backend.http.response.ProductResponse;
import com.luizcasagrande.easycart.backend.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final ModelMapper modelMapper;
    private final ProductService productService;

    @GetMapping
    public Page<ProductResponse> findAll(@RequestParam(value = "query", required = false) String query,
                                         Pageable pageable) {
        return productService.findAll(query, pageable)
                .map(this::toResponse);
    }

    @GetMapping("{id}")
    public ProductResponse findById(@PathVariable Long id) {
        return toResponse(productService.findById(id));
    }

    @AuthorizeOnlyManager
    @PostMapping
    public ResponseEntity<ProductResponse> save(@Valid @RequestBody ProductRequest productRequest) {
        var product = modelMapper.map(productRequest, Product.class);
        product = productService.save(product);
        return status(CREATED).body(toResponse(product));
    }

    @AuthorizeOnlyManager
    @PutMapping("{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id,
                                                  @Valid @RequestBody ProductUpdateRequest productUpdateRequest) {
        var product = productService.findById(id);
        modelMapper.map(productUpdateRequest, product);
        product = productService.save(product);
        return status(OK).body(toResponse(product));
    }

    @AuthorizeOnlyManager
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return noContent().build();
    }

    @GetMapping("category")
    public Set<String> findAllCategories() {
        return productService.findAllCategories();
    }

    @GetMapping("category-in")
    public Page<ProductResponse> findByCategoryIn(@RequestParam("categories") Set<String> categories,
                                                  Pageable pageable) {
        return productService.findByCategoryIn(categories, pageable)
                .map(this::toResponse);
    }

    private ProductResponse toResponse(Product p) {
        return modelMapper.map(p, ProductResponse.class);
    }
}

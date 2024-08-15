import {Component, OnInit} from '@angular/core';
import {ProductService} from "../management/product/product.service";
import {Product} from "../management/product/product";
import {catchError, finalize} from "rxjs";
import {Err} from "../shared/err";
import {MessageService} from "primeng/api";
import {CartService} from "../cart/cart.service";
import {MESSAGES} from "../constants/app.constants";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];
  selectedCategories: string[] = [];
  loading = false;

  constructor(private readonly productService: ProductService,
              private readonly cartService: CartService,
              private readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.findAllCategories()
      .pipe(catchError(Err.handle(this.messageService)))
      .subscribe(r => this.categories = r);

    this.productService.findAll({page: 0, size: 20, sort: 'id,asc'})
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => this.loading = false),
      )
      .subscribe(r => this.products = r.content)
  }

  addToCart(productId: number): void {
    this.cartService.add(productId);
    this.messageService.add(MESSAGES.ADDED_TO_CART);
  }
}

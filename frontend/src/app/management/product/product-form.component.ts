import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";
import {BaseForm} from "../../framework/base-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "./product";
import {MessageService} from "primeng/api";
import {catchError, finalize} from "rxjs";
import {Err} from "../../shared/err";
import {LoaderService} from "../../shared/loader/loader.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent extends BaseForm {

  protected categories: string[] = [];

  constructor(private readonly productService: ProductService,
              private readonly messageService: MessageService,
              private readonly loaderService: LoaderService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
    super();
    this.createFormGroup();
    if (this.getId()) {
      this.loaderService.show();
      this.productService.findById(this.getId())
        .pipe(
          catchError(Err.handle(this.messageService)),
          finalize(() => this.loaderService.hide()),
        )
        .subscribe(r => this.form.patchValue(r))
    }
  }

  override submit(): void {
    this.loaderService.show();
    this.productService.save(<Product>this.form.value, this.getId())
      .pipe(
        catchError(Err.handle(this.messageService)),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe(r => {
        this.router.navigateByUrl('management/product/' + r.id)
          .then(() => {
            this.form.patchValue(r);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Registro salvo.',
            });
          });
      });
  }

  getId(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('id') || 0);
  }

  reset(): void {
    this.router.navigateByUrl('management/product/new')
      .then(() => this.createFormGroup());
  }

  protected findAllCategories() {
    this.productService.findAllCategories()
      .pipe(catchError(Err.handle(this.messageService)))
      .subscribe(r => this.categories = r);
  }

  private createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl({value: '', disabled: !!this.getId()}, Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('0', [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }
}

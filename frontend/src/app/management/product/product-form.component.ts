import {Component} from '@angular/core';
import {ProductService} from "./product.service";
import {BaseForm} from "../../core/framework/base-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "./product";
import {MESSAGES} from "../../shared/constants/app.constants";
import {EasyCartService} from "../../shared/easy-cart.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent extends BaseForm {

  protected categories: string[] = [];

  constructor(private readonly ecService: EasyCartService,
              private readonly productService: ProductService) {
    super();
    this.ecService.onChangeUrl(id => {
      this.id = id;
      this.ecService.executeRequest(this.productService.findById(id))
        .subscribe(r => this.form.patchValue(r));
    });
  }

  protected override createFormGroup() {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl({value: '', disabled: !!this.id}, Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('0', [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  protected override submit(): void {
    this.ecService.executeRequest(this.productService.save(<Product>this.form.value, this.id))
      .subscribe(r => this.ecService.navigateByUrl('management/product/' + r.id)
        .then(() => {
          this.form.patchValue(r);
          this.ecService.addMessage(MESSAGES.RECORD_SAVED);
        }));
  }

  protected reset(): void {
    this.ecService.navigateByUrl('management/product/new')
      .then(() => this.createFormGroup());
  }

  protected findAllCategories() {
    this.ecService.executeRequest(this.productService.findAllCategories(), false)
      .subscribe(r => this.categories = r);
  }
}

import { Component } from '@angular/core';
import { BaseForm } from '../../core/framework/base-form';
import { EasyCartService } from '../../shared/easy-cart.service';
import { ProductService } from './product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from './product-data';
import { MESSAGES } from '../../shared/constants/app.constants';
import { Card } from 'primeng/card';
import { HeaderActions } from '../../shared/header-actions/header-actions';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Field } from '../../shared/field/field';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { Image } from 'primeng/image';
import { InputText } from 'primeng/inputtext';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    Card,
    HeaderActions,
    Button,
    RouterLink,
    Field,
    InputNumber,
    Textarea,
    Image,
    InputText,
    AutoComplete,
  ],
  templateUrl: './product-form.html',
})
export class ProductForm extends BaseForm {
  protected categories: string[] = [];

  constructor(
    protected easyCartService: EasyCartService,
    protected productService: ProductService,
  ) {
    super();
    this.easyCartService.onChangeUrl((id) => {
      this.id = id;
      this.easyCartService
        .executeRequest(this.productService.findById(id))
        .subscribe((r) => this.form.patchValue(r));
    });
  }

  protected override createFormGroup() {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl({ value: '', disabled: !!this.id }, Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('0', [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  protected override submit(): void {
    this.easyCartService
      .executeRequest(this.productService.save(<Product>this.form.value, this.id))
      .subscribe((r) =>
        this.easyCartService.navigateByUrl('management/product/' + r.id).then(() => {
          this.form.patchValue(r);
          this.easyCartService.addMessage(MESSAGES.RECORD_ADDED);
        }),
      );
  }

  protected reset(): void {
    this.easyCartService.navigateByUrl('management/product/new').then(() => this.createFormGroup());
  }

  protected findAllCategories() {
    this.easyCartService
      .executeRequest(this.productService.findAllCategories(), false)
      .subscribe((r) => (this.categories = r));
  }
}

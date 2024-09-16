import {Directive} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Directive()
export abstract class BaseForm {

  protected form!: FormGroup;

  submit(): void {
  }

  protected onSubmit(): void {
    if (this.isValid()) {
      this.submit()
    } else {
      this.validate();
    }
  }

  protected isValid(): boolean {
    return this.form.valid;
  }

  protected validate(): void {
    for (let key in this.form.controls) {
      this.form.get(key)!.markAsDirty();
      this.form.get(key)!.markAsTouched();
      this.form.get(key)!.updateValueAndValidity();
    }
  }
}

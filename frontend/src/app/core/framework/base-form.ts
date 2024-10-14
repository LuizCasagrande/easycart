import {Directive} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Directive()
export abstract class BaseForm {

  protected form!: FormGroup;
  protected id!: number;

  protected constructor() {
    this.createFormGroup();
  }

  protected createFormGroup(): void {
  }

  protected submit(): void {
  }

  protected onSubmit(): void {
    this.isValid()
      ? this.submit()
      : this.validate();
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

  protected getValue(path: string): any {
    return this.form.get(path)?.value;
  }
}

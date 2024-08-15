import {Component, Input} from '@angular/core';

@Component({
  selector: 'ec-field',
  templateUrl: './field.component.html',
})
export class FieldComponent {

  @Input()
  label = '';

  @Input()
  inputId: string | undefined = '';
}

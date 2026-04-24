import { Component, Input } from '@angular/core';

@Component({
  selector: 'ec-field',
  imports: [],
  templateUrl: './field.html',
})
export class Field {
  @Input()
  label = '';

  @Input()
  inputId = '';
}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ec-radio-button-card',
  templateUrl: './radio-button-card.component.html',
})
export class RadioButtonCardComponent {

  @Input()
  inputId = '';

  @Input()
  radioButtonValue = '';

  @Input()
  selectedValue = '';

  @Output()
  selectedValueChange = new EventEmitter<string>();
}

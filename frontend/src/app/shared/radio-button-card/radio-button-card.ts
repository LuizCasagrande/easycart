import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ec-radio-button-card',
  imports: [RadioButton, FormsModule],
  templateUrl: './radio-button-card.html',
})
export class RadioButtonCard {
  @Input()
  inputId = '';

  @Input()
  radioButtonValue: any;

  @Input()
  value: any;

  @Output()
  valueChange = new EventEmitter<any>();
}

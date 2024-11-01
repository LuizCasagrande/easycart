import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cart} from "../cart";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent {

  @Input()
  index = 0;

  @Output()
  onNavigate = new EventEmitter<number>();

  @Input()
  cart!: Cart;

  @Input()
  total = 0;
}

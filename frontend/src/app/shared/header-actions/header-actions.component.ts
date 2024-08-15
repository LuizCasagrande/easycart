import {Component, Directive, Input} from '@angular/core';

@Component({
  selector: 'ec-header-actions',
  templateUrl: './header-actions.component.html',
})
export class HeaderActionsComponent {
}

@Directive({
  selector: '[ecTemplate]'
})
export class EcTemplate {
  @Input() template!: string;
}

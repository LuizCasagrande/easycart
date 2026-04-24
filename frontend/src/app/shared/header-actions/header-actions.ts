import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'ec-header-actions',
  imports: [],
  templateUrl: './header-actions.html',
})
export class HeaderActions {}

@Directive({
  selector: '[ecTemplate]',
})
export class EcTemplate {
  @Input() template!: string;
}

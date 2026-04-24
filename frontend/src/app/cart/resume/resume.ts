import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartRequest } from '../cart-data';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Divider } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resume',
  imports: [Card, Button, CurrencyPipe, Divider, DatePipe, RouterLink],
  templateUrl: './resume.html',
})
export class Resume {
  @Input()
  index = 0;

  @Input()
  cart = new CartRequest();

  @Input()
  total = 0;

  @Output()
  onNavigate = new EventEmitter<number>();
}

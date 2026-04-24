import { Component } from '@angular/core';
import { CatalogDataView } from '../catalog-dataview';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.html',
  imports: [NgClass, RouterLink, Button, CurrencyPipe],
})
export class CatalogList extends CatalogDataView {}

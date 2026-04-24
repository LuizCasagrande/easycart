import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { CatalogDataView } from '../catalog-dataview';

@Component({
  selector: 'app-catalog-grid',
  templateUrl: './catalog-grid.html',
  imports: [NgClass, RouterLink, Button, CurrencyPipe],
})
export class CatalogGrid extends CatalogDataView {}

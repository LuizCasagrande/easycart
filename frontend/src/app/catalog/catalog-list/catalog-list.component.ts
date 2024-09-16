import {Component} from '@angular/core';
import {CatalogDataView} from "../catalog.component";

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
})
export class CatalogListComponent extends CatalogDataView {
}

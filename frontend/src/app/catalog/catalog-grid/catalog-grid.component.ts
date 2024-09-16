import {Component} from '@angular/core';
import {CatalogDataView} from "../catalog.component";

@Component({
  selector: 'app-catalog-grid',
  templateUrl: './catalog-grid.component.html',
  styles: `
    @media screen and (min-width: 1200px) {
      .xl\\:w-20-percent {
        width: 20% !important;
      }
    }
  `,
})
export class CatalogGridComponent extends CatalogDataView {
}

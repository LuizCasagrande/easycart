import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'th[tableHeader]',
  imports: [TableModule],
  templateUrl: './table-header.html',
})
export class TableHeader {
  @Input()
  field = '';
  @Input()
  displayName = '';
}

import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Order } from '../order-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-product-chips',
  imports: [NgOptimizedImage],
  templateUrl: './order-product-chips.html',
  styles: `
    .product-chips {
      display: flex;
      align-items: end;
      color: var(--p-inputtext-border-color);
      height: 2rem;

      img {
        &:first-child {
          margin-left: 0;
        }

        border-radius: 50%;
        border: 2px solid var(--p-inputtext-border-color);
        margin-left: -10px;
      }
    }
  `,
})
export class OrderProductChips {
  @Input()
  order!: Order;

  resizeImage(url: string, width: number, height: number): string {
    return `${environment.imageCdnUrl}/${encodeURIComponent(url)}?width=${width}&height=${height}`;
  }

  protected getFirst3Products() {
    return this.order.products.sort((a, b) => a.id - b.id).slice(0, 3);
  }
}

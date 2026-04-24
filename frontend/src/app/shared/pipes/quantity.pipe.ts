import { Pipe, PipeTransform } from '@angular/core';

const empty = '';
const zero = '0';

@Pipe({
  name: 'quantity',
})
export class QuantityPipe implements PipeTransform {
  transform(value: number, prefix?: 'prefix' | null): string {
    const oneDigitValue = String(value).length === 1;
    if (prefix) {
      return oneDigitValue ? zero : empty;
    }
    return oneDigitValue ? zero + value : empty + value;
  }
}

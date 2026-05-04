import { Pageable } from '../core/framework/page-data';
import { HttpParams } from '@angular/common/http';

export function nowPlusDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function getPageableParams(pageable: Pageable): HttpParams {
  return new HttpParams()
    .set('page', pageable.page)
    .set('size', pageable.size)
    .set('sort', pageable.sort);
}

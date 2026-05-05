import { Injectable } from '@angular/core';
import { catchError, filter, finalize, map, Observable } from 'rxjs';
import { Err } from './err';
import { LoaderService } from './loader/loader.service';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class EasyCartService {
  constructor(
    protected loaderService: LoaderService,
    protected messageService: MessageService,
    protected router: Router,
  ) {}

  onChangeUrl(func: (id: number) => void): void {
    const onNavigationEnd = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
    );

    onNavigationEnd.pipe(takeUntilDestroyed()).subscribe((url) => {
      const items = url.split('/');
      const id = Number(items[items.length - 1] || 0);
      if (id) {
        func(id);
      }
    });
  }

  executeRequest<T>(
    request: Observable<T>,
    showLoader = true,
    onFinalize = () => {},
  ): Observable<T> {
    if (showLoader) {
      this.loaderService.show();
    }
    return request.pipe(
      catchError(Err.handle(this.messageService)),
      finalize(() => {
        this.loaderService.hide();
        onFinalize();
      }),
    );
  }

  addMessage(message: ToastMessageOptions): void {
    this.messageService.add(message);
  }

  navigateByUrl(url: string): Promise<boolean> {
    return this.router.navigateByUrl(url);
  }
}

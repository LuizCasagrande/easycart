import {Injectable} from '@angular/core';
import {catchError, filter, finalize, map, Observable} from "rxjs";
import {Err} from "./err";
import {LoaderService} from "./loader/loader.service";
import {Message, MessageService} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EasyCartService {

  constructor(private readonly loaderService: LoaderService,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  onChangeUrl(func: (id: number) => void): void {
    this.onNavigationEnd().subscribe(url => {
      const items = url.split('/');
      const id = Number(items[items.length - 1] || 0);
      if (id) {
        func(id);
      }
    });
  }

  onNavigationEnd(): Observable<string> {
    return this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
    );
  }

  executeRequest<T>(
    request: Observable<T>,
    showLoader = true,
    onFinalize = () => {
    },
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

  addMessage(message: Message): void {
    this.messageService.add(message);
  }

  navigateByUrl(url: string): Promise<boolean> {
    return this.router.navigateByUrl(url)
  }
}

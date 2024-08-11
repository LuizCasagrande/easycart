import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MessageService} from "primeng/api";

export class Err {

  static handle(messageService: MessageService): (err: HttpErrorResponse) => Observable<never> {
    return err => {
      if (HttpStatusCode.Unauthorized === err.status) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Email ou senha inválidos.',
        });
      } else {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message || 'Ocorreu um problema.',
        });
      }
      return throwError(() => new Error(err.message));
    };
  }
}

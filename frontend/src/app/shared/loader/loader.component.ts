import {Component} from '@angular/core';
import {LoaderService} from "./loader.service";
import {of} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {

  protected blocked$ = of(false);

  constructor(private readonly loaderService: LoaderService) {
    this.blocked$ = this.loaderService.loaderSubject.asObservable();
  }
}

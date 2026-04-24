import { Component } from '@angular/core';
import { BlockUI } from 'primeng/blockui';
import { LoaderService } from './loader.service';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [BlockUI, AsyncPipe],
  templateUrl: './loader.html',
})
export class Loader {
  protected blocked$ = of(false);

  constructor(protected loaderService: LoaderService) {
    this.blocked$ = this.loaderService.visible$;
  }
}

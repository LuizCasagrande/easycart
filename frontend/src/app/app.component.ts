import {AfterContentChecked, ChangeDetectorRef, Component} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterContentChecked {

  constructor(private readonly primeNGConfig: PrimeNGConfig,
              private readonly cdRef: ChangeDetectorRef) {
    this.primeNGConfig.ripple = true;
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
}

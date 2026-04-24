import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Sidebar } from './core/sidebar/sidebar';
import { Navbar } from './core/navbar/navbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { AsyncPipe, NgClass } from '@angular/common';
import { Loader } from './shared/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Sidebar, Navbar, ConfirmDialog, NgClass, AsyncPipe, Loader],
  templateUrl: './app.html',
})
export class App {}

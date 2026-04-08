import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './core/services/toast/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fondos-app';
    toastService = inject(ToastService);


}

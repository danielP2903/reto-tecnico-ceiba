import { Component, inject, signal } from '@angular/core';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { ITabs } from '../../core/models/tabs';
import { TABS } from '../../shared/constants/tabs';
import { Router, RouterOutlet } from '@angular/router';
import { CardClientComponent } from './components/card-client/card-client.component';

@Component({
  selector: 'app-funds',
  imports: [TabsComponent,RouterOutlet,CardClientComponent],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.scss'
})
export class FundsComponent {

  /**Inyeccion de dependencias */
  private readonly router = inject(Router);

  /**Variables */
  tabs = signal<ITabs[]>(TABS);

  /**Metodo para manejar la pulsación de una pestaña */
  tabOnpressed(index: number) {
    const path = this.tabs()[index].route;
    this.navigateTo(path);
  }

  navigateTo(path: string) {
    this.router.navigate([`/fondos/${path}`]);
  }
}

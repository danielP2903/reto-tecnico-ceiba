import { Component, inject } from '@angular/core';
import { AppState } from '../../../../core/store/app.store';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  /**Inyeccion de dependencias */
  private readonly store = inject(AppState);


  /**Metodo que devuelve el historial de transacciones */
  get transactions() {
    return this.store.transactionsHistory();
  }
}

import { Component, inject } from '@angular/core';
import { AppState } from '../../../../core/store/app.store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-client',
  imports: [CurrencyPipe],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss'
})
export class CardClientComponent {
    /**Inyeccion de dependencias */
  private readonly store = inject(AppState);


  getName() {
    return this.store.name()
  }

  getAmount(){
    return this.store.availableAmount();
  }

  getInvest() {
    return this.store.investedAmount();
  }

}

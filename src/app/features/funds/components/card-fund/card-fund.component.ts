import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { IFund } from '../../../../core/models/fund';
import { CurrencyPipe, NgClass } from '@angular/common';
import { AppState } from '../../../../core/store/app.store';

@Component({
  selector: 'app-card-fund',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './card-fund.component.html',
  styleUrl: './card-fund.component.scss'
})
export class CardFundComponent  {


  @Input() fund!:IFund;
  @Output() fundSubscribe = new EventEmitter<IFund>();
  hasSuscription = false;
  private readonly store = inject(AppState);

  /**Variable computada para detectar los cambios reactivamente del store y saber si esta o no suscrito a un fondo */
  hasSubscription = computed(() => {
    return this.store.fundsSubscribed().some((f) => f === this.fund.id);
  })


  /**Metodo para obtener el monto disponible */
  getAmountAvailable() {
    return this.store.availableAmount();
  }
}

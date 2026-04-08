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
  hasSubscription = computed(() => {
    return this.store.fundsSubscribed().some((f) => f === this.fund.id);
  })



  getAmountAvailable() {
    return this.store.availableAmount();
  }
}

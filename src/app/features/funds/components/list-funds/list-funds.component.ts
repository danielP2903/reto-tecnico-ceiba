import { Component, inject, signal, Type } from '@angular/core';
import { IFund } from '../../../../core/models/fund';
import { AVAILABLE_FUNDS } from '../../../../shared/constants/funds';
import { CardFundComponent } from '../card-fund/card-fund.component';
import { AppState } from '../../../../core/store/app.store';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { TypeNotification, TypeTransaction } from '../../../../core/models/store';
import { ModalConfirmSuscriptionComponent } from '../modal-confirm-suscription/modal-confirm-suscription.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-funds',
  imports: [CardFundComponent,ModalConfirmSuscriptionComponent,CurrencyPipe],
  templateUrl: './list-funds.component.html',
  styleUrl: './list-funds.component.scss'
})
export class ListFundsComponent {


  /**Inyeccion de dependencias */
  private readonly store = inject(AppState);
  private readonly toastService = inject(ToastService);
  /**Variables */
  funds = signal<IFund[]>(AVAILABLE_FUNDS);
  isModalOpen = signal(false);
  fundSelected = signal<IFund>({} as IFund);
  typeNotification = signal<TypeNotification>('EMAIL');
  receiveFundSubscribe(fund: IFund) {


    this.fundSelected.set(fund);
    if (!this.verifySubscription(fund.id)) {
      this.openModalConfirm();
      return;
    }
    this.unsuscribeFund(fund);

  }

  verifyAmountAvailable(fund: IFund): boolean {
    const amount = this.store.availableAmount();
    return amount >= fund.minimumAmount;
  }

  unsuscribeFund(fund: IFund) {
    this.store.unsuscribeFund(fund.id);
    this.findNotificationFundSuscribed();
    this.store.recoverInvestment(fund.minimumAmount);
    this.createRegisterAction(fund,'Cancelacion');
    this.toastService.warning('¡Suscripción cancelada!', `Has cancelado la suscripción al fondo ${fund.name} y se ha recuperado tu inversión de ${this.transformAmount(fund.minimumAmount)}.`);
  }

  findNotificationFundSuscribed(){
      const transaction = this.store.transactionsHistory().find((t) => t.idFund === this.fundSelected().id && t.type === 'Suscripcion');
      this.typeNotification.set(transaction ? transaction.notification : 'EMAIL');

  }

  transformAmount(amount: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(amount);
  }

  openModalConfirm() {
    this.isModalOpen.set(true);
  }

  executeActionConfirm(event: {confirmed:boolean, notification:string}) {
    if (event.confirmed) {
      this.typeNotification.set(event.notification as TypeNotification);
      this.subscribeFund();
    }
    this.isModalOpen.set(false);
  }

  subscribeFund() {
    const amount = this.store.availableAmount();
    if (!this.verifyAmountAvailable(this.fundSelected())) {
      this.toastService.danger('¡Fondos insuficientes!', `No tienes suficiente dinero disponible para suscribirte al fondo ${this.fundSelected().name}. Monto disponible: ${this.transformAmount(amount)}.`);
      return;
    }
    this.store.subscribeFund(this.fundSelected().id);
    this.createRegisterAction(this.fundSelected(),'Suscripcion');
    this.store.investAmount(this.fundSelected().minimumAmount);
    this.toastService.success('¡Suscripción exitosa!', `Te has suscrito al fondo ${this.fundSelected().name} con un monto de ${this.transformAmount(this.fundSelected().minimumAmount)}.`);
  }

  verifySubscription(fundId: number): boolean {
    return this.store.fundsSubscribed().some((f) => f === fundId);
  }

  createRegisterAction(fund:IFund,typeTransaction:TypeTransaction) {
    this.store.addTransactionHistory(fund,typeTransaction,this.typeNotification());
  }
}

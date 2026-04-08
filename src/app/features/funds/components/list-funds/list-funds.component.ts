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

  /**Metodo para verificar si hay fondos disponibles
   * @param fund  - El fondo al cual se desea suscribir el usuario
   * @returns boolean - Retorna true si el usuario tiene fondos disponibles para suscribirse al fondo, de lo contrario retorna false
   * @description Este metodo obtiene el monto disponible del usuario a traves del store y lo compara con el monto minimo requerido por el fondo para determinar si el usuario puede suscribirse o no al fondo.
  */
  verifyAmountAvailable(fund: IFund): boolean {
    const amount = this.store.availableAmount();
    return amount >= fund.minimumAmount;
  }

  /**Metodo para desuscribir un usuario de un fondo llamando los metodos del store, y crea el registro en el historial
   * @param fund - El fondo del cual se desea cancelar la suscripción
   */
  unsuscribeFund(fund: IFund) {
    this.store.unsuscribeFund(fund.id);
    this.findNotificationFundSuscribed();
    this.store.recoverInvestment(fund.minimumAmount);
    this.createRegisterAction(fund,'Cancelacion');
    this.toastService.warning('¡Suscripción cancelada!', `Has cancelado la suscripción al fondo ${fund.name} y se ha recuperado tu inversión de ${this.transformAmount(fund.minimumAmount)}.`);
  }

  /**Metodo para encontrar la notificación del fondo suscrito
   * @description Este metodo busca en el historial de transacciones la notificación asociada al fondo suscrito
   */
  findNotificationFundSuscribed(){
      const transaction = this.store.transactionsHistory().find((t) => t.idFund === this.fundSelected().id && t.type === 'Suscripcion');
      this.typeNotification.set(transaction ? transaction.notification : 'EMAIL');

  }
  /**Metodo para transformar el monto a formato de moneda
   * @param amount - El monto a transformar
   * @returns string - El monto transformado a formato de moneda
   */
  transformAmount(amount: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(amount);
  }

  /**Metodo para abrir el modal de confirmación
   * @description Este metodo establece el estado de apertura del modal de confirmación
   */
  openModalConfirm() {
    this.isModalOpen.set(true);
  }

  /**Metodo que recibe la acción de confirmación del modal
   * @param event - El evento de confirmación con la información de la notificación
   */
  executeActionConfirm(event: {confirmed:boolean, notification:string}) {
    if (event.confirmed) {
      this.typeNotification.set(event.notification as TypeNotification);
      this.subscribeFund();
    }
    this.isModalOpen.set(false);
  }

  /**Metodo para suscribir un usuario a un fondo llamando los metodos del store, y crea el registro en el historial
   * @param fund - El fondo al cual se desea suscribir el usuario
   */
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

  /**Metodo para verificar si un usuario está suscrito a un fondo
   * @param fundId - El ID del fondo a verificar
   * @returns boolean - Retorna true si el usuario está suscrito al fondo, de lo contrario retorna false
   */
  verifySubscription(fundId: number): boolean {
    return this.store.fundsSubscribed().some((f) => f === fundId);
  }

  /**Metodo para crear un registro de acción en el historial
   * @param fund - El fondo al cual se desea crear el registro
   * @param typeTransaction - El tipo de transacción
   */
  createRegisterAction(fund:IFund,typeTransaction:TypeTransaction) {
    this.store.addTransactionHistory(fund,typeTransaction,this.typeNotification());
  }
}

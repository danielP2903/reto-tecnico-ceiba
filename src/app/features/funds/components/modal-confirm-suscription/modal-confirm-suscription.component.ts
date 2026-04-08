import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IFund } from '../../../../core/models/fund';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-confirm-suscription',
  imports: [CurrencyPipe,ReactiveFormsModule],
  templateUrl: './modal-confirm-suscription.component.html',
  styleUrl: './modal-confirm-suscription.component.scss'
})
export class ModalConfirmSuscriptionComponent {

  /**Eventos */
  @Input() fund!:IFund;
  @Output() confirmAction = new EventEmitter<{ confirmed: boolean ,notification:string}>();
  /**Inyeccion de dependencias */
  private readonly fb = inject(FormBuilder);

  /**Variables */
  form:FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fb.group({
      notificacion: ['EMAIL', Validators.required],
    });
  }
  /**Metodo para confirmar la suscripción */
  confirmSubscribe(): void {
    this.confirmAction.emit({confirmed: true, notification: this.form.value.notificacion});
  }
  /**Metodo para cerrar el modal */
  onClose(): void {
    this.confirmAction.emit({confirmed: false, notification: ''});
  }
}

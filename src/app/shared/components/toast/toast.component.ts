import { Component, Input, OnInit, OnDestroy, ElementRef, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() type: string  = 'success';
  @Input() title: string = 'Opps';
  @Input() text: string  = 'Ha ocurrido un error';
  @Input() duration: number = 4000;

  @Output() dismissed = new EventEmitter<void>();

  isLeaving = false;

  private _hideTimer?: ReturnType<typeof setTimeout>;
  private _toastEl?: HTMLElement;
  private _toastService = inject(ToastService);

  constructor(private _el: ElementRef) {}

  ngOnInit(): void {
    this._toastEl = this._el.nativeElement.querySelector('.container');

    if (this._toastEl && this.duration > 0) {
      this._toastEl.style.setProperty('--toast-duration', `${this.duration}ms`);
      this._hideTimer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this._hideTimer);
  }

  dismiss(): void {
    if (this.isLeaving) return;
    this.isLeaving = true;

    setTimeout(() => {
      this.dismissed.emit();
      this._toastService.hide();
    }, 300);
  }
}

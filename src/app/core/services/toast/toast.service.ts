import { Injectable, signal } from '@angular/core';

export interface ToastConfig {
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  text: string;
  duration?: number;
}
@Injectable({ providedIn: 'root' })
export class ToastService {

  toast = signal<ToastConfig | null>(null);

  show(config: ToastConfig): void {
    this.toast.set({
      duration: 3000,
      ...config,
    });
  }

  hide(): void {
    this.toast.set(null);
  }

  // helpers rápidos
  success(title: string, text: string, duration = 3000) {
    this.show({ type: 'success', title, text, duration });
  }
  danger(title: string, text: string, duration = 3000) {
    this.show({ type: 'danger', title, text, duration });
  }
  warning(title: string, text: string, duration = 3000) {
    this.show({ type: 'warning', title, text, duration });
  }
  info(title: string, text: string, duration = 3000) {
    this.show({ type: 'info', title, text, duration });
  }
}

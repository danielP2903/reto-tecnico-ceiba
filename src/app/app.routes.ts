import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'fondos',
    loadComponent: () => import('./features/funds/funds.component').then(c => c.FundsComponent),
    children: [
      {
        path: 'lista',
        loadComponent: () => import('./features/funds/components/list-funds/list-funds.component').then(c => c.ListFundsComponent)
      },
      {
        path: 'historial',
        loadComponent: () => import('./features/funds/components/history/history.component').then(c => c.HistoryComponent)
      },
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'fondos',
    pathMatch: 'full',
  }
];

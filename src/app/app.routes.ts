import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // children: [
    //   { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    //   { path: 'gadgets', loadComponent: () => import('./features/gadgets/gadgets.component').then(m => m.GadgetsComponent) },
    // ]
  },
  { path: '**', redirectTo: '' },
];

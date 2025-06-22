import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './auth/uth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'gadgets',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./gadgets/gadgets.component').then((m) => m.GadgetsComponent),
      },
      {
        path: 'gadgets/:id',
        loadComponent: () =>
          import('./gadgets/gadget-detail/gadget-detail.component').then(
            (m) => m.GadgetDetailComponent
          ),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

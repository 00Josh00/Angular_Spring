import { Routes } from '@angular/router';
import { Clientes } from './components/clientes/clientes';
import { Directiva } from './components/directiva/directiva';

export const routes: Routes = [
  { path: 'clientes', component: Clientes },
  { path: 'directivas', component: Directiva },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }
];

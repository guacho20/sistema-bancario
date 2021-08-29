import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestroySessionGuard } from './guards/destroy-session.guard';
import { SeguridadGuard } from './guards/seguridad.guard';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canDeactivate: [DestroySessionGuard] },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'auditoria', loadChildren: () => import('./auditoria/auditoria.module').then(m => m.AuditoriaModule) },
  { path: 'cuenta-bancaria', loadChildren: () => import('./cuenta-bancaria/cuenta-bancaria.module').then(m => m.CuentaBancariaModule) },
  { path: 'seguridad', loadChildren: () => import('./seguridad/seguridad.module').then(m => m.SeguridadModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }

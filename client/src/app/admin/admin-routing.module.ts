import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SeguridadGuard } from './guards/seguridad.guard';
import { Page401Component } from './shared/page401/page401.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  {
    path: 'private',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

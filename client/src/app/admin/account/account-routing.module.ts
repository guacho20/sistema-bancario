import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestroySessionGuard } from '@admin/guards/destroy-session.guard';
import { SeguridadGuard } from '@admin/guards/seguridad.guard';

// componentes
import { AccountComponent } from './account.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'profile', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: ProfileComponent },
      { path: 'change-password', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: ChangePasswordComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

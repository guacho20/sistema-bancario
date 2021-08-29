import { AdminModule } from '@admin/admin.module';
import { AuthModule } from '@admin/auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthModule,
    AdminModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

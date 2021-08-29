import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './admin/auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { GraficoModule } from './grafico/grafico.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    AdminModule,
    GraficoModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

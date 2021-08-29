import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadGuard } from '@admin/guards/seguridad.guard';
import { DestroySessionGuard } from '@admin/guards/destroy-session.guard';

// componentes
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { TipoAccionComponent } from './pages/tipo-accion/tipo-accion.component';

const routes: Routes = [
  { path: 'consulta', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: ConsultaComponent },
  { path: 'tipo-accion', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: TipoAccionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriaRoutingModule { }

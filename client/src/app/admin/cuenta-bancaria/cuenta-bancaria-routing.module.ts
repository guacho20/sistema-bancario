import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestroySessionGuard } from '@admin/guards/destroy-session.guard';
import { SeguridadGuard } from '@admin/guards/seguridad.guard';

// component
import { CajasComponent } from './pages/cajas/cajas.component';
import { TipoCuentaComponent } from './pages/tipo-cuenta/tipo-cuenta.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { PermisoResolver } from './resolvers/permiso.resolvers';

const routes: Routes = [
  { path: 'cajas', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: CajasComponent },
  { path: 'clientes', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: PersonaComponent },
  { path: 'empleados', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: EmpleadoComponent },
  { path: 'tipo-cuenta', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: TipoCuentaComponent },
  { path: 'tipo-documento', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: TipoDocumentoComponent },
  { path: 'transacciones', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: TransaccionesComponent, resolve: {permiso: PermisoResolver} },
  { path: 'consulta-transacciones', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: ConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaBancariaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestroySessionGuard } from '@admin/guards/destroy-session.guard';
import { SeguridadGuard } from '@admin/guards/seguridad.guard';

// componentes
import { OpcionesComponent } from './pages/opciones/opciones.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { PruebaComponent } from './pages/prueba/prueba.component';

const routes: Routes = [
  { path: 'empresa', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: EmpresaComponent },
  { path: 'opcion', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: OpcionesComponent },
  { path: 'permiso', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: PermisosComponent },
  { path: 'usuario', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: UsuariosComponent },
  { path: 'prueba', canDeactivate: [DestroySessionGuard], canActivate: [SeguridadGuard], component: PruebaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }

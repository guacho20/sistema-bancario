import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from 'ngprime-core';

import { SharedModule } from '@admin/shared/shared.module';
import { CuentaBancariaRoutingModule } from './cuenta-bancaria-routing.module';
import { TipoCuentaComponent } from './pages/tipo-cuenta/tipo-cuenta.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { CajasComponent } from './pages/cajas/cajas.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ModalReporteComponent } from './components/modal-reporte/modal-reporte.component';
import { ModalTranferenciaComponent } from './components/modal-tranferencia/modal-tranferencia.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';


@NgModule({
  declarations: [
    TipoCuentaComponent,
    TipoDocumentoComponent,
    CajasComponent,
    TransaccionesComponent,
    EmpleadoComponent,
    PersonaComponent,
    ModalTranferenciaComponent,
    ModalReporteComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CuentaBancariaRoutingModule,
    SharedModule,
    ComponentesModule
  ]
})
export class CuentaBancariaModule { }

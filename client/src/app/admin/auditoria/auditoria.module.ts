import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { ComponentesModule } from 'ngprime-core';

import { ConsultaComponent } from './pages/consulta/consulta.component';
import { TipoAccionComponent } from './pages/tipo-accion/tipo-accion.component';



@NgModule({
  declarations: [
    ConsultaComponent,
    TipoAccionComponent
  ],
  imports: [
    CommonModule,
    AuditoriaRoutingModule,
    SharedModule,
    ComponentesModule
  ]
})
export class AuditoriaModule { }

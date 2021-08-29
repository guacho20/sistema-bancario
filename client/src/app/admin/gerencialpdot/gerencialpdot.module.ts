import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from 'ngprime-core';

import { GerencialpdotRoutingModule } from './gerencialpdot-routing.module';
import { FrecuenciaComponent } from './pages/frecuencia/frecuencia.component';
import { PerspectivaComponent } from './pages/perspectiva/perspectiva.component';
import { MatrizgerencialComponent } from './pages/matrizgerencial/matrizgerencial.component';
import { ProyectoComponent } from './pages/proyecto/proyecto.component';
import { DireccionComponent } from './pages/direccion/direccion.component';
import { ComponenteComponent } from './pages/componente/componente.component';
import { ObjetivosComponent } from './pages/objetivos/objetivos.component';
import { ComponentsModule } from './components/components.module';
import { ResponsableProyectoComponent } from './pages/responsable-proyecto/responsable-proyecto.component';


@NgModule({
  declarations: [
    FrecuenciaComponent,
    PerspectivaComponent,
    MatrizgerencialComponent,
    ProyectoComponent,
    DireccionComponent,
    ComponenteComponent,
    ObjetivosComponent,
    ResponsableProyectoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GerencialpdotRoutingModule,
    ComponentesModule,
    SharedModule,
    ComponentsModule
  ]
})
export class GerencialpdotModule { }

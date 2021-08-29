import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GraficoRoutingModule } from './grafico-routing.module';
import { ComponentesModule } from 'ngprime-core';
import { GraficoComponent } from './grafico.component';

@NgModule({
  declarations: [
    GraficoComponent
  ],
  imports: [
    CommonModule,
    GraficoRoutingModule,
    ComponentesModule,
    FormsModule
  ]
})
export class GraficoModule { }

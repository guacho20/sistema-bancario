import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoComponent } from './grafico.component';

const routes: Routes = [
  { path: 'grafico', component: GraficoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoRoutingModule { }

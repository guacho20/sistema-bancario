import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from 'src/app/admin/shared/class/barmenu';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: [
  ]
})
export class ProyectoComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_proyecto', 'ide_proyecto', 1);
    this.tabTabla1.setTitulo('REGISTRO DE PROYECTOS');
    this.tabTabla1.getColumna('ide_proyecto').setNombreVisual('Código');
    this.tabTabla1.getColumna('ide_componente').setNombreVisual('Componente');
    this.tabTabla1.getColumna('ide_componente').setCombo('ge_componente', 'ide_componente', 'detalle_compo');
    this.tabTabla1.getColumna('ide_componente').setAutocompletar();
    this.tabTabla1.getColumna('detalle_proyecto').setNombreVisual('Proyecto');
    this.tabTabla1.getColumna('vision_prpoyecto').setNombreVisual('Objetivo');
    this.tabTabla1.getColumna('ide_proyecto').setLongitud(10);
    this.tabTabla1.getColumna('ide_componente').setLongitud(25);
    this.tabTabla1.getColumna('detalle_proyecto').setLongitud(35);
    this.tabTabla1.getColumna('vision_prpoyecto').setLongitud(35);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.dibujar();

    await this.tabTabla2.setTabla('ge_objetivo', 'ide_objetivo', 2);
    this.tabTabla2.getColumna('ide_objetivo').setNombreVisual('Código');
    this.tabTabla2.getColumna('detalle_objetivo').setNombreVisual('Meta');
    this.tabTabla2.getColumna('ide_objetivo').setLongitud(10);
    this.tabTabla2.setTitulo('METAS');
    this.tabTabla2.dibujar();
  }

  ngOnInit(): void {
  }
  insertar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
    } else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.insertar();
    }
  }
  async guardar(): Promise<void> {
    if (await this.tabTabla1.isGuardar()) {
      // console.log('entre al guardar');
      if (await this.tabTabla2.isGuardar()) {
        await this.utilitarioSvc.guardarPantalla(this.tabTabla1, this.tabTabla2);
      }
    }
  }
  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    } else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.eliminar();
    }
  }
}

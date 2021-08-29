import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from 'src/app/admin/shared/class/barmenu';

@Component({
  selector: 'app-frecuencia',
  templateUrl: './frecuencia.component.html',
  styles: [
  ]
})
export class FrecuenciaComponent extends BarMenu implements OnInit, AfterViewInit {
  @ViewChild('tabTabla1', {static: false}) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_frecuencia', 'ide_frecuencia', 1);
    this.tabTabla1.setTitulo('REGISTRO DE FRECUENCIA');
    this.tabTabla1.getColumna('ide_frecuencia').setNombreVisual('código');
    this.tabTabla1.getColumna('detalle_frecuencia').setNombreVisual('FRECUENCIA');
    this.tabTabla1.getColumna('ide_frecuencia').setLongitud(10);
    this.tabTabla1.dibujar();
  }

  ngOnInit(): void {
  }

  insertar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
    }
  }
  async guardar(): Promise<void> {
    if (await this.tabTabla1.isGuardar()) {
      this.utilitarioSvc.guardarPantalla(this.tabTabla1);
    }
  }
  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    }
  }

}

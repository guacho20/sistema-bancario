import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from 'src/app/admin/shared/class/barmenu';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styles: [
  ]
})
export class DireccionComponent extends BarMenu implements OnInit, AfterViewInit {
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_direccion', 'ide_direccion', 1);
    this.tabTabla1.setTitulo('REGISTRO DE DIRECCIONES');
    this.tabTabla1.getColumna('ide_direccion').setNombreVisual('código');
    this.tabTabla1.getColumna('detalle_direccion').setNombreVisual('detalle');
    this.tabTabla1.getColumna('abreviatura_direccion').setNombreVisual('abreviatura');
    this.tabTabla1.getColumna('ide_direccion').setLongitud(10);
    this.tabTabla1.getColumna('abreviatura_direccion').setLongitud(15);
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


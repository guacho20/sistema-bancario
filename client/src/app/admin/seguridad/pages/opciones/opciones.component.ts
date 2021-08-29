import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '../../../shared/class/barmenu';
import { ArbolComponent, TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styles: [
  ]
})
export class OpcionesComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('arbArbol', { static: true }) arbArbol: ArbolComponent;
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    this.arbArbol.setArbol('seg_opcion', 'ide_segopc', 'nombre_segopc', 'seg_ide_segopc');
    this.arbArbol.setTitulo('OPCIONES');
    this.arbArbol.dibujar();

    await this.tabTabla1.setTabla('seg_opcion', 'ide_segopc', 1);
    this.tabTabla1.getColumna('ide_segopc').setNombreVisual('código');
    this.tabTabla1.getColumna('nombre_segopc').setNombreVisual('nombre');
    this.tabTabla1.getColumna('ruta_segopc').setNombreVisual('ruta');
    this.tabTabla1.getColumna('icono_segopc').setNombreVisual('icono');
    this.tabTabla1.getColumna('auditoria_segopc').setNombreVisual('auditoria');
    this.tabTabla1.getColumna('auditoria_segopc').setVisible(false);
    this.tabTabla1.getColumna('manual_segopc').setVisible(false);
    this.tabTabla1.agregarArbol(this.arbArbol);
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

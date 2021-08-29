import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '../../../shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-tipo-accion',
  templateUrl: './tipo-accion.component.html',
  styles: [
  ]
})
export class TipoAccionComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('seg_accion_auditoria', 'ide_seacau', 1);
    this.tabTabla1.setTitulo('REGISTRO ACCIONES DE AUDITORIA');
    this.tabTabla1.getColumna('ide_seacau').setNombreVisual('código');
    this.tabTabla1.getColumna('nombre_segacau').setNombreVisual('nombre');
    this.tabTabla1.getColumna('descripcion_seacau').setNombreVisual('descripción');
    this.tabTabla1.getColumna('ide_seacau').setLongitud(10);
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
      console.log('Hola mundo guardar');
      this.utilitarioSvc.guardarPantalla(this.tabTabla1);
    }
  }

  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    }
  }

}

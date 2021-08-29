import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '../../../shared/class/barmenu';
import { UtilitarioService, TablaComponent } from 'ngprime-core';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: [
  ]
})
export class PermisosComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('seg_perfil', 'ide_segper', 1);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.setTitulo('Perfiles del sistema');
    this.tabTabla1.getColumna('ide_segper').setNombreVisual('código');
    this.tabTabla1.getColumna('nombre_segper').setNombreVisual('nombre');
    this.tabTabla1.getColumna('descripcion_segper').setNombreVisual('descripción');
    this.tabTabla1.getColumna('activo_segper').setNombreVisual('activo');
    this.tabTabla1.getColumna('perm_util_segper').setNombreVisual('perm util');
    this.tabTabla1.getColumna('perm_util_segper').setVisible(false);
    this.tabTabla1.getColumna('ide_segper').setLongitud(10);
    this.tabTabla1.setRows(5);
    this.tabTabla1.dibujar();

    await this.tabTabla2.setTabla('seg_perfil_opcion', 'ide_sepeop', 2);
    this.tabTabla2.setTitulo('Permisos de menú');
    this.tabTabla2.getColumna('ide_segopc').setComboServicio('seguridad/getOpciones');
    this.tabTabla2.getColumna('ide_segopc').setAutocompletar();
    this.tabTabla2.getColumna('ide_sepeop').setNombreVisual('código');
    this.tabTabla2.getColumna('ide_segopc').setNombreVisual('opción');
    this.tabTabla2.getColumna('ide_segopc').setComentario('Opciones disponibles del sistema');
    this.tabTabla2.getColumna('lectura_sepeop').setNombreVisual('lectura');
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

  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    } else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.eliminar();
    }
  }

  async guardar(): Promise<void> {
    if (await this.tabTabla1.isGuardar()) {
      console.log('entre al guardar');
      if (await this.tabTabla2.isGuardar()) {
        await this.utilitarioSvc.guardarPantalla(this.tabTabla1, this.tabTabla2);
      }
    }
  }

}

import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from 'src/app/admin/shared/class/barmenu';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styles: [
  ]
})
export class ObjetivosComponent extends BarMenu implements OnInit, AfterViewInit {
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_objetivo', 'ide_objetivo', 1);
    this.tabTabla1.setTitulo('LISTADO DE PROYECTOS');
    this.tabTabla1.getColumna('ide_proyecto').setCombo('ge_proyecto', 'ide_proyecto', 'detalle_proyecto');
    this.tabTabla1.getColumna('ide_objetivo').setNombreVisual('Código');
    this.tabTabla1.getColumna('ide_proyecto').setNombreVisual('Proyecto');
    this.tabTabla1.getColumna('detalle_objetivo').setNombreVisual('Meta');
    this.tabTabla1.getColumna('ide_objetivo').setLongitud(10);
    this.tabTabla1.getColumna('ide_proyecto').setLongitud(30);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.setRows(5);
    this.tabTabla1.dibujar();
    
    await this.tabTabla2.setTabla('ge_objetivo_direccion', 'ide_objdire', 2);
    this.tabTabla2.setTitulo('DIRECCIONES RESPONSABLE');
    this.tabTabla2.getColumna('ide_objdire').setLongitud(10);
    this.tabTabla2.getColumna('ide_direccion').setCombo('ge_direccion', 'ide_direccion', 'detalle_direccion');
    this.tabTabla2.getColumna('ide_objetivo').setLongitud(30);
    this.tabTabla2.getColumna('ide_direccion').setLongitud(30);
    this.tabTabla2.getColumna('ide_objdire').setNombreVisual('código');
    this.tabTabla2.getColumna('ide_direccion').setNombreVisual('direccion');
    this.tabTabla2.setRows(5);
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

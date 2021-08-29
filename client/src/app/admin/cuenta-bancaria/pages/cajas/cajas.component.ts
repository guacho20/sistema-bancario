import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from '@admin/shared/class/barmenu';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styles: [
  ]
})
export class CajasComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ban_caja', 'ide_bacaj', 1);
    this.tabTabla1.setTitulo('REGISTRO DE CAJAS');
    this.tabTabla1.getColumna('ide_bacaj').setNombreVisual('código');
    this.tabTabla1.getColumna('detalle_bacaj').setNombreVisual('detalle');
    this.tabTabla1.getColumna('ide_bacaj').setLongitud(10);
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

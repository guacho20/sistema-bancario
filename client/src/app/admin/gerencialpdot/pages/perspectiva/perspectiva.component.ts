import { BarMenu } from 'src/app/admin/shared/class/barmenu';
import { UtilitarioService, TablaComponent } from 'ngprime-core';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-perspectiva',
  templateUrl: './perspectiva.component.html',
  styles: [
  ]
})
export class PerspectivaComponent extends BarMenu implements OnInit, AfterViewInit {
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_perspectiva', 'ide_perspectiva', 1);
    this.tabTabla1.setTitulo('REGISTRO DE INDICADORES');
    this.tabTabla1.getColumna('ide_perspectiva').setNombreVisual('código');
    this.tabTabla1.getColumna('detalle_perspectiva').setNombreVisual('INDICADOR');
    this.tabTabla1.getColumna('abreviatura_ystmen').setNombreVisual('abreviatura');
    this.tabTabla1.getColumna('ide_perspectiva').setLongitud(10);
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

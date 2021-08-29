import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '@admin/shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-tipo-cuenta',
  templateUrl: './tipo-cuenta.component.html',
  styles: [
  ]
})
export class TipoCuentaComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ban_tipo_cuenta_bancaria', 'ide_batcb', 1);
    this.tabTabla1.setTitulo('REGISTRO DE TIPO CUENTA BANCARIA');
    this.tabTabla1.getColumna('ide_batcb').setNombreVisual('código');
    this.tabTabla1.getColumna('detalle_batcb').setNombreVisual('detalle');
    this.tabTabla1.getColumna('ide_batcb').setLongitud(10);
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

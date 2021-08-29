import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '@admin/shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styles: [
  ]
})
export class TipoDocumentoComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ban_tipo_documento', 'ide_batid', 1);
    this.tabTabla1.setTitulo('REGISTRO DE TIPO DOCUMENTO');
    this.tabTabla1.getColumna('ide_batid').setNombreVisual('código');
    this.tabTabla1.getColumna('detalle_batid').setNombreVisual('detalle');
    this.tabTabla1.getColumna('ide_batid').setLongitud(10);
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

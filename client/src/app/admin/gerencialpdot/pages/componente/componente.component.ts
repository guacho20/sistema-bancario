import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from 'src/app/admin/shared/class/barmenu';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styles: [
  ]
})
export class ComponenteComponent extends BarMenu implements OnInit, AfterViewInit {
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_componente', 'ide_componente', 1);
    this.tabTabla1.setTitulo('REGISTRO DE COMPONENTES');
    await this.tabTabla1.getColumna('ide_componente').setNombreVisual('código');
    await this.tabTabla1.getColumna('detalle_compo').setNombreVisual('componente');
    await this.tabTabla1.getColumna('ide_componente').setLongitud(10);
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

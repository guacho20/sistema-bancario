import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from '../../../shared/class/barmenu';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: [
  ]
})
export class PruebaComponent extends BarMenu implements OnInit, AfterViewInit {


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }
  async ngAfterViewInit(): Promise<void> {
    
    await this.tabTabla1.setTabla('seg_sucursal', 'ide_segsuc', 1);
    this.tabTabla1.setTitulo('Tabla 1');
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.getColumna('ide_segsuc').setNombreVisual('Còdigo');
    this.tabTabla1.getColumna('nombre_segsuc').setValorDefecto('Lotita');
    this.tabTabla1.getColumna('direccion_segsuc').setRequerido(true);
    this.tabTabla1.getColumna('telefonos_segsuc').setComentario('Este campo registra los nùmeros de telefonos de la sucursal');
    this.tabTabla1.getColumna('nombre_segsuc').setLectura(true);
    this.tabTabla1.getColumna('ide_segemp').setVisible(false);
    this.tabTabla1.dibujar();

    
  }
  ngOnInit(): void {
  }

  insertar(): void {
    if(this.tabTabla1.isFocus()){
        this.tabTabla1.insertar();
    }
  }
  async guardar(): Promise<void> {
    if(this.tabTabla1.isGuardar()){
      await this.utilitarioSvc.guardarPantalla(this.tabTabla1);
    }
  }
  eliminar(): void {
    if(this.tabTabla1.isFocus()){
      this.tabTabla1.eliminar();
    }
  }

  

}

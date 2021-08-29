import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu } from '@admin/shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: []
})
export class EmpresaComponent extends BarMenu implements OnInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    this.barBotones.quitarBotonInsertar();
    this.barBotones.quitarBotonEliminar();
    
    await this.tabTabla1.setTabla('seg_empresa', 'ide_segemp', 1);
    this.tabTabla1.setTitulo('Jhon Alex');
    this.tabTabla1.getColumna('ide_segemp').setNombreVisual('código');
    this.tabTabla1.getColumna('nombre_segemp').setNombreVisual('nombre');
    this.tabTabla1.getColumna('identificacion_segemp').setNombreVisual('identificación');
    this.tabTabla1.getColumna('nombre_corto_segemp').setNombreVisual('nombre corto');
    this.tabTabla1.getColumna('representante_segemp').setNombreVisual('representante');
    this.tabTabla1.getColumna('correo_segemp').setNombreVisual('correo');
    this.tabTabla1.getColumna('pagina_segemp').setNombreVisual('página web');
    this.tabTabla1.getColumna('direccion_segemp').setNombreVisual('dirección');
    this.tabTabla1.getColumna('telefono_segemp').setNombreVisual('teléfono');
    this.tabTabla1.getColumna('logo_segemp').setVisible(false);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.dibujar();

  }

  ngOnInit(): void {
  }

  insertar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
    } 
  }

  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    } 
  }

  async guardar(): Promise<void> {
    if (await this.tabTabla1.isGuardar()) {
      await this.utilitarioSvc.guardarPantalla(this.tabTabla1);
      
    }
  }

}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '@admin/shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})
export class EmpleadoComponent extends BarMenu implements OnInit, AfterViewInit {

  condicion = {
    condicion: 'tipo_perso=$1',
    valores: [1]
  };

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ban_persona', 'ide_perso', 1);
    this.tabTabla1.setTitulo('REGISTRAR EMPLEADOS');
    this.tabTabla1.getColumna('ide_batid').setCombo('ban_tipo_documento', 'ide_batid', 'detalle_batid');
    this.tabTabla1.getColumna('ide_perso').setNombreVisual('Código');
    this.tabTabla1.getColumna('nombre_perso').setNombreVisual('nombre');
    this.tabTabla1.getColumna('direccion_perso').setNombreVisual('direccion');
    this.tabTabla1.getColumna('correo_perso').setNombreVisual('correo');
    this.tabTabla1.getColumna('telefono_perso').setNombreVisual('telefono');
    this.tabTabla1.getColumna('telefono_perso').setMascara('(999) 999-9999');
    this.tabTabla1.getColumna('cedula_perso').setNombreVisual('documento');
    this.tabTabla1.getColumna('ide_batid').setNombreVisual('tipo documento');
    this.tabTabla1.getColumna('tipo_perso').setValorDefecto(1);
    this.tabTabla1.getColumna('tipo_perso').setVisible(false);
    this.tabTabla1.getColumna('ide_perso').setLongitud(10);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    // orden
    this.tabTabla1.getColumna('ide_perso').setOrden(0);
    this.tabTabla1.getColumna('ide_batid').setOrden(1);
    this.tabTabla1.getColumna('cedula_perso').setOrden(2);
    this.tabTabla1.getColumna('nombre_perso').setOrden(3);
    this.tabTabla1.getColumna('direccion_perso').setOrden(4);
    this.tabTabla1.getColumna('correo_perso').setOrden(5);
    this.tabTabla1.getColumna('telefono_perso').setOrden(6);
    this.tabTabla1.setCondiciones(this.condicion);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.dibujar();

    await this.tabTabla2.setTabla('ban_empleado', 'ide_baemp', 2);
    this.tabTabla2.setTitulo('REGISTRAR PERMISOS');
    this.tabTabla2.getColumna('ide_bacaj').setCombo('ban_caja', 'ide_bacaj', 'detalle_bacaj');
    this.tabTabla2.getColumna('ide_segusu').setComboServicio('seguridad/getusuarios');
    this.tabTabla2.getColumna('ide_baemp').setLongitud(10);
    this.tabTabla2.getColumna('ide_baemp').setNombreVisual('código');
    this.tabTabla2.getColumna('ide_bacaj').setNombreVisual('caja');
    this.tabTabla2.getColumna('activo_baemp').setNombreVisual('activo');
    this.tabTabla2.getColumna('ide_segusu').setNombreVisual('USUARIo');
    this.tabTabla2.getColumna('ide_segusu').setRequerido(true);
    this.tabTabla2.getColumna('activo_baemp').setValorDefecto(true);
    this.tabTabla2.getColumna('ide_bacaj').setLongitud(20);
    this.tabTabla2.getColumna('ide_segusu').setLongitud(20);
    // orden
    this.tabTabla2.getColumna('ide_baemp').setOrden(0);
    this.tabTabla2.getColumna('ide_bacaj').setOrden(1);
    this.tabTabla2.getColumna('ide_segusu').setOrden(2);
    this.tabTabla2.getColumna('activo_baemp').setOrden(3);
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
      if (await this.tabTabla2.isGuardar()) {
        await this.utilitarioSvc.guardarPantalla(this.tabTabla1, this.tabTabla2);
      }
    }
  }

}

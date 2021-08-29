import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { BarMenu } from '@admin/shared/class/barmenu';
import { CuentaBancariaService } from '../../service/cuenta-bancaria.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: [
  ]
})
export class PersonaComponent extends BarMenu implements OnInit, AfterViewInit {

  condicion = {
    condicion: 'tipo_perso=$1',
    valores: [0]
  };

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  constructor(private utilitarioSvc: UtilitarioService, private cuentaBancariaSvc: CuentaBancariaService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ban_persona', 'ide_perso', 1);
    this.tabTabla1.setTitulo('REGISTRAR CLIENTES');
    this.tabTabla1.getColumna('ide_batid').setCombo('ban_tipo_documento', 'ide_batid', 'detalle_batid');
    this.tabTabla1.getColumna('ide_perso').setNombreVisual('Código');
    this.tabTabla1.getColumna('nombre_perso').setNombreVisual('nombre');
    this.tabTabla1.getColumna('direccion_perso').setNombreVisual('direccion');
    this.tabTabla1.getColumna('correo_perso').setNombreVisual('correo');
    this.tabTabla1.getColumna('telefono_perso').setNombreVisual('telefono');
    this.tabTabla1.getColumna('cedula_perso').setNombreVisual('documento');
    this.tabTabla1.getColumna('ide_batid').setNombreVisual('tipo documento');
    this.tabTabla1.getColumna('telefono_perso').setMascara('(999) 999-9999');
    this.tabTabla1.getColumna('tipo_perso').setValorDefecto(0);
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

    await this.tabTabla2.setTabla('ban_cuenta_bancaria', 'ide_cuban', 2);
    this.tabTabla2.setTitulo('REGISTRAR CUENTAS BANCARIAS');
    this.tabTabla2.getColumna('ide_batcb').setCombo('ban_tipo_cuenta_bancaria', 'ide_batcb', 'detalle_batcb');
    this.tabTabla2.getColumna('ide_batcb').setLongitud(15);
    this.tabTabla2.getColumna('ide_cuban').setLongitud(10);
    this.tabTabla2.getColumna('ide_cuban').setNombreVisual('código');
    this.tabTabla2.getColumna('ide_batcb').setNombreVisual('Tipo cuenta');
    this.tabTabla2.getColumna('numero_cuban').setNombreVisual('número cuenta');
    this.tabTabla2.getColumna('fecha_apertura_cuban').setNombreVisual('Fecha apertura');
    this.tabTabla2.getColumna('fecha_cierra_cuban').setNombreVisual('fecha cierre');
    this.tabTabla2.getColumna('activo_cuban').setNombreVisual('activo');
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
      const cedula = this.tabTabla1.getValor('cedula_perso');
      const tipo = this.tabTabla1.getValor('ide_batid');
      if (this.cuentaBancariaSvc.validarDocumento(tipo, cedula)) {
        if (await this.tabTabla2.isGuardar()) {
          await this.utilitarioSvc.guardarPantalla(this.tabTabla1, this.tabTabla2);
        }
      }
    }
  }

}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RangoFechaComponent, TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styles: [
  ]
})
export class ConsultaComponent implements AfterViewInit {

  @ViewChild('ranFechas', { static: false }) ranFechas: RangoFechaComponent;
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  columnas = 'ide_batran,empleado,cliente,tranferido,caja,tipo_transferencia,valor,fecha,hora';

  constructor(private utilitarioSvc: UtilitarioService) { }

  async ngAfterViewInit(): Promise<void> {

    this.ranFechas.onBuscar = () => { this.buscar(); };

    const condicion = { condicion: ' ide_batran=$1', valores: [-1] };
    await this.tabTabla1.setTablaServicio('banco/getTransacciones', condicion, 'ide_batran', 1, this.columnas);
    this.tabTabla1.getColumna('ide_batran').setNombreVisual('código');
    this.tabTabla1.getColumna('ide_batran').setLongitud(7);
    this.tabTabla1.getColumna('tranferido').setNombreVisual('transferido a');
    this.tabTabla1.getColumna('tranferido').setLongitud(20);
    this.tabTabla1.getColumna('tipo_transferencia').setNombreVisual('tipo transferencia');
    this.tabTabla1.getColumna('tipo_transferencia').setLongitud(15);
    this.tabTabla1.getColumna('cliente').setLongitud(20);
    this.tabTabla1.getColumna('empleado').setLongitud(20);
    this.tabTabla1.getColumna('caja').setLongitud(10);
    this.tabTabla1.getColumna('fecha').setLongitud(7);
    this.tabTabla1.getColumna('hora').setLongitud(7);
    this.tabTabla1.getColumna('valor').setLongitud(7);
    this.tabTabla1.dibujar();
  }


  buscar(): void {
    const condicion = { condicion: ' fecha_batran between $1 and $2', valores: [this.ranFechas.getValorFechaInicial(), this.ranFechas.getValorFechaFinal()] };
    this.tabTabla1.setTablaServicio('banco/getTransacciones', condicion, 'ide_batran', 1, this.columnas);
    this.tabTabla1.getColumna('ide_batran').setNombreVisual('código');
    this.tabTabla1.getColumna('ide_batran').setLongitud(7);
    this.tabTabla1.getColumna('tranferido').setNombreVisual('transferido a');
    this.tabTabla1.getColumna('tranferido').setLongitud(20);
    this.tabTabla1.getColumna('tipo_transferencia').setNombreVisual('tipo transferencia');
    this.tabTabla1.getColumna('tipo_transferencia').setLongitud(15);
    this.tabTabla1.getColumna('cliente').setLongitud(20);
    this.tabTabla1.getColumna('empleado').setLongitud(20);
    this.tabTabla1.getColumna('caja').setLongitud(10);
    this.tabTabla1.getColumna('fecha').setLongitud(7);
    this.tabTabla1.getColumna('hora').setLongitud(7);
    this.tabTabla1.getColumna('valor').setLongitud(7);
    this.tabTabla1.ejecutar();
  }

}

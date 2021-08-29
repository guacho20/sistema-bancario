import { BarMenu } from '@admin/shared/class/barmenu';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import PDFObject from 'pdfobject';
import { CuentaBancariaService } from '../../service/cuenta-bancaria.service';

interface Permiso {
  ide_perso: number;
  ide_bacaj: number;
  ide_segusu: number;
  detalle_bacaj: string;
  nombre_perso: string;
}

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styles: [
  ]
})
export class TransaccionesComponent extends BarMenu implements OnInit, AfterViewInit {

  condicion = {
    condicion: 'ide_batran=$1',
    valores: [-1]
  };

  lista1 = [{ value: 0, label: 'Deposito' }, { value: 1, label: 'Retiro' }, { value: 2, label: 'Transferencia' }];
  isOpenModal = false;
  cliente = -1;
  saldo = 0;
  body1 = { persona: -1 };

  tienePermiso = false;

  permiso: Permiso;

  urlImage = '';

  isDibujarReporte = false;


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(
    private utilitarioSvc: UtilitarioService,
    private cuentaBancariaSvc: CuentaBancariaService,
    private route: ActivatedRoute
  ) {
    super();
    // console.log(this.route.snapshot.data.permiso);
    this.permiso = this.route.snapshot.data.permiso;
    this.tienePermiso = (utilitarioSvc.isUndefined(this.permiso)) ? true : false;
  }

  async ngAfterViewInit(): Promise<void> {

    if (!this.tienePermiso) {
      this.barBotones.quitarBotones();
      return this.utilitarioSvc.agregarMensajeAdvertencia('EL usuario ingresado no registra permisos para generar transacciones. Consulte con el Administrador');
    }

    await this.tabTabla1.setTabla('ban_transaccion', 'ide_batran', 1);
    this.tabTabla1.setTitulo('REGISTRO DE TRANSACCIONES');
    this.tabTabla1.getColumna('tipo_transaccion_batran').setComboObject(this.lista1);
    this.tabTabla1.getColumna('tipo_transaccion_batran').setNombreVisual('tipo transaccion');
    this.tabTabla1.getColumna('fecha_batran').setValorDefecto(this.utilitarioSvc.getFechaActual('DD/MM/YYYY'));
    this.tabTabla1.getColumna('ide_perso').setComboServicio('banco/getClientes');
    this.tabTabla1.getColumna('ban_ide_perso').setVisible(false);
    this.tabTabla1.getColumna('ban_ide_perso').setLectura(true);
    this.tabTabla1.getColumna('ide_cuban').setComboServicio('banco/getCuentasClienteAll');
    this.tabTabla1.getColumna('ban_ide_cuban').setVisible(false);
    this.tabTabla1.getColumna('ide_bacaj').setVisible(false);
    this.tabTabla1.getColumna('ban_ide_perso2').setVisible(false);
    this.tabTabla1.getColumna('ban_ide_perso2').setValorDefecto(this.permiso.ide_perso);
    this.tabTabla1.getColumna('ide_bacaj').setValorDefecto(this.permiso.ide_bacaj);
    this.tabTabla1.getColumna('ban_ide_cuban').setLectura(true);
    this.tabTabla1.getColumna('ide_perso').setNombreVisual('cliente');
    this.tabTabla1.getColumna('ide_batran').setNombreVisual('código');
    this.tabTabla1.getColumna('valor_batran').setNombreVisual('valor');
    this.tabTabla1.getColumna('ide_perso').setRequerido(true);
    this.tabTabla1.getColumna('valor_batran').setRequerido(true);
    this.tabTabla1.getColumna('tipo_transaccion_batran').setRequerido(true);
    this.tabTabla1.getColumna('ide_cuban').setRequerido(true);
    this.tabTabla1.getColumna('ide_cuban').setNombreVisual('cuenta');
    this.tabTabla1.getColumna('fecha_batran').setNombreVisual('fecha');
    this.tabTabla1.getColumna('hora_batran').setVisible(false);
    this.tabTabla1.getColumna('fecha_batran').setLectura(true);
    this.tabTabla1.getColumna('hora_batran').setLectura(true);
    this.tabTabla1.getColumna('ide_cuban').setLectura(true);
    this.tabTabla1.getColumna('ide_perso').onMetodoChange = () => { this.cargarCuentas(); };
    this.tabTabla1.getColumna('ide_cuban').onMetodoChange = () => { this.calcularSaldo(); };
    this.tabTabla1.setCampoOrden('ide_batran desc');
    this.tabTabla1.setCondiciones(this.condicion);
    // orden
    this.tabTabla1.getColumna('ide_batran').setOrden(0);
    this.tabTabla1.getColumna('ide_perso').setOrden(1);
    this.tabTabla1.getColumna('ide_cuban').setOrden(2);
    this.tabTabla1.getColumna('tipo_transaccion_batran').setOrden(3);
    this.tabTabla1.getColumna('valor_batran').setOrden(4);
    this.tabTabla1.getColumna('fecha_batran').setOrden(5);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.dibujar();
  }

  ngOnInit(): void {
  }

  async cargarCuentas(): Promise<void> {
    this.utilitarioSvc.abrirLoading();
    this.tabTabla1.getColumna('ide_cuban').setLectura(false);
    const persona = this.tabTabla1.getValor('ide_perso');
    const body = { persona };
    this.tabTabla1.getColumna('ide_cuban').setComboServicio('banco/getCuentasCliente', body);
    await this.tabTabla1.actualizarCombo('ide_cuban').finally(() => {
      this.utilitarioSvc.cerrarLoading();
    });
  }

  async calcularSaldo(): Promise<void> {

    this.utilitarioSvc.abrirLoading();
    const persona = this.tabTabla1.getValor('ide_perso');
    const cuenta = this.tabTabla1.getValor('ide_cuban');
    const sql = `select sum(valor_batran) as saldo from ban_transaccion where ide_perso=$1 and ide_cuban=$2`;
    this.utilitarioSvc.getConsultaGenerica(sql, [persona, cuenta]).subscribe(res => {
      // console.log(res);
      if (res.datos[0].saldo) {
        this.saldo = res.datos[0].saldo;
      } else {
        this.saldo = 0;
      }
      this.utilitarioSvc.cerrarLoading();
      /* finalize(() => {
      }); */
    }, (err) => { this.utilitarioSvc.cerrarLoading(); });
  }


  async insertar(): Promise<void> {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
      this.tabTabla1.getColumna('ide_cuban').setComboServicio('banco/getCuentasCliente', this.body1);
      await this.tabTabla1.actualizarCombo('ide_cuban');
    }
  }
  async guardar(): Promise<void> {
    this.utilitarioSvc.abrirLoading();
    const tipo = this.tabTabla1.getValor('tipo_transaccion_batran');
    const valor = this.tabTabla1.getValor('valor_batran');
    const persona = this.tabTabla1.getValor('ide_perso');
    if (await this.tabTabla1.isGuardar()) {
      if (this.validarSaldo()) {
        if (tipo === 1) {
          this.tabTabla1.setValor('valor_batran', '-' + valor);
        }
        if (tipo === 2) {
          this.utilitarioSvc.cerrarLoading();
          // console.log('abro el modal para la transferencia');
          this.cliente = persona;
          this.isOpenModal = true;
        } else {
          const hoy = new Date();
          const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
          this.tabTabla1.setValor('hora_batran', hora);
          this.utilitarioSvc.guardarPantalla(this.tabTabla1).finally(() => {
            this.utilitarioSvc.cerrarLoading();
            this.saldo = 0;
            this.abrirVisualizador();
          });
        }
      } else {
        this.utilitarioSvc.cerrarLoading();
        this.utilitarioSvc.agregarMensajeAdvertencia('No puede realizar la transacción, no tiene <strong>saldo suficiente</strong>');
      }
    }
  }
  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    }
  }

  validarSaldo(): boolean {
    const valor = this.tabTabla1.getValor('valor_batran');
    const tipo = this.tabTabla1.getValor('tipo_transaccion_batran');
    if (tipo === 1 || tipo === 2) {
      if (valor > this.saldo) {
        return false;
      }
    }
    return true;
  }

  closeDialogo(event): void {
    this.isOpenModal = event;
  }

  async valorModal(event): Promise<void> {
    console.log('respuesta del modal', event);
    const hoy = new Date();
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    this.utilitarioSvc.abrirLoading();
    const valor = this.tabTabla1.getValor('valor_batran');
    this.tabTabla1.setValor('valor_batran', '-' + valor);
    this.tabTabla1.setValor('ban_ide_perso', event.persona);
    this.tabTabla1.setValor('ban_ide_cuban', event.cuenta);
    this.tabTabla1.setValor('hora_batran', hora);
    await this.utilitarioSvc.guardarPantalla(this.tabTabla1).finally(() => {
      this.utilitarioSvc.cerrarLoading();
      this.saldo = 0;
      this.abrirVisualizador();
    });
    // this.isOpenModal = event;
  }

  abrirVisualizador(): void {
    this.utilitarioSvc.abrirLoading();
    this.cuentaBancariaSvc.getTicket().subscribe(res => {
      this.urlImage = res;
      this.isDibujarReporte = true;
      this.utilitarioSvc.cerrarLoading();
    },
      (err => this.utilitarioSvc.cerrarLoading()));
  }

  abriModal(e): void {
    const options = {
      height: '450px'

    };
    const myPDF = PDFObject.embed(this.urlImage, '#pdf', options);
  }

}

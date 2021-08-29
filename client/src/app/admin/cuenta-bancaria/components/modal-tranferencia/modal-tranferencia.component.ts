import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ComboComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-modal-tranferencia',
  templateUrl: './modal-tranferencia.component.html',
  styleUrls: ['./modal-tranferencia.component.css']
})
export class ModalTranferenciaComponent implements AfterViewInit {

  @Input() display = false;
  @Input() datos: any = -1;
  @Output() close = new EventEmitter<boolean>();
  @Output() valores = new EventEmitter<any>();

  @ViewChild('comPersona', { static: false }) comPersona: ComboComponent;
  @ViewChild('comCuenta', { static: false }) comCuenta: ComboComponent;

  constructor(private utilitarioSvc: UtilitarioService) { }

  async ngAfterViewInit(): Promise<void> {
    // console.log(this.datos);
    // this.comProyecto.setLectura(true);
    this.utilitarioSvc.abrirLoading();
    await this.comPersona.setComboServicio('banco/getClientesExcluido', { persona: this.datos });
    this.utilitarioSvc.cerrarLoading();
    this.comPersona.onChange = () => { this.cargarCuenta(); };
    this.comCuenta.setLectura(true);
  }

  async cargarCuenta(): Promise<void> {
    this.comCuenta.setLectura(true);
    this.comCuenta.limpiar();
    const proyecto = this.comPersona.getValor();
    this.utilitarioSvc.abrirLoading();
    await this.comCuenta.setComboServicio('banco/getCuentasCliente', { persona: proyecto });
    this.comCuenta.setLectura(false);
    this.utilitarioSvc.cerrarLoading();
  }

  aceptar(): void {
    const persona = this.comPersona.getValor();
    const cuenta = this.comCuenta.getValor();
    if (persona === this.datos) {
      this.utilitarioSvc.agregarMensajeAdvertencia('No puede realizar la transferencia a la misma persona.');
      return;
    }
    if (!this.utilitarioSvc.isUndefined(persona)) {
      this.utilitarioSvc.agregarMensajeAdvertencia('Seleccione persona a quien va realizar la transferencia.');
      return;
    }
    if (!this.utilitarioSvc.isUndefined(cuenta)) {
      this.utilitarioSvc.agregarMensajeAdvertencia('Seleccione la cuenta de la persona a realizar la transferencia.');
      return;
    }
    this.utilitarioSvc.confirmar('Esta seguro que desea realizar la transferencia.', () => this.enviarDatos());
  }

  enviarDatos(): void {
    const persona = this.comPersona.getValor();
    const cuenta = this.comCuenta.getValor();

    this.valores.emit({ persona, cuenta });
    this.display = false;
    this.close.emit(false);
  }

  closeModal(): void {
    this.display = false;
    this.close.emit(false);
  }

}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu } from '../../../shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import { SeguridadService } from '../../services/seguridad.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  constructor(
    private utilitarioSvc: UtilitarioService,
    private seguridadSvc: SeguridadService) {
    super();
  }

  
  async ngAfterViewInit(): Promise<void> {
    // this.utilitarioSvc.getFechaActual();
    await this.tabTabla1.setTabla('seg_usuario', 'ide_segusu', 1);
    /* this.tabTabla1.setTitulo('Registrar usuario');
    this.tabTabla1.getColumna('ide_segper').setCombo('seg_perfil', 'ide_segper', 'nombre_segper');
    this.tabTabla1.getColumna('ide_segusu').setNombreVisual('codigo');
    this.tabTabla1.getColumna('ide_segper').setNombreVisual('perfil');
    this.tabTabla1.getColumna('nombre_segusu').setNombreVisual('nombre');
    this.tabTabla1.getColumna('username_segusu').setNombreVisual('usuario');
    this.tabTabla1.getColumna('correo_segusu').setNombreVisual('correo');
    this.tabTabla1.getColumna('fecha_reg_segusu').setNombreVisual('fecha registro');
    this.tabTabla1.getColumna('activo_segusu').setNombreVisual('activo');
    this.tabTabla1.getColumna('bloqueado_segusu').setNombreVisual('bloqueado');
    this.tabTabla1.getColumna('cambia_clave_segusu').setNombreVisual('cambia clave');
    this.tabTabla1.getColumna('foto_segusu').setVisible(false);
    this.tabTabla1.getColumna('ide_segemp').setVisible(false);
    this.tabTabla1.getColumna('fecha_reg_segusu').setLectura(true);
    this.tabTabla1.getColumna('cambia_clave_segusu').setValorDefecto(true);
    this.tabTabla1.getColumna('cambia_clave_segusu').setLectura(true);
    this.tabTabla1.getColumna('password_segusu').setVisible(false);
    this.tabTabla1.getColumna('activo_segusu').setValorDefecto(true);
    this.tabTabla1.getColumna('bloqueado_segusu').setValorDefecto(false);
    this.tabTabla1.getColumna('tema_segusu').setVisible(false);
    this.tabTabla1.getColumna('tema_segusu').setVisible(false);
    this.tabTabla1.getColumna('fecha_reg_segusu').setValorDefecto(this.utilitarioSvc.getFechaActual('DD/MM/YYYY'));
    this.tabTabla1.getColumna('username_segusu').onMetodoChange = () => { this.passwordValue(); };
    this.tabTabla1.onPageChange = () => { this.cambiarEstadoNick() };*/
    /*this.tabTabla1.getColumna('ide_segemp').setTamanoFormularioColumna(4);
    this.tabTabla1.getColumna('nombre_segusu').setTamanoFormularioColumna(6);
    this.tabTabla1.getColumna('username_segusu').setTamanoFormularioColumna(2);*/
    // this.tabTabla1.setTipoFormulario();
    this.tabTabla1.dibujar();
    // this.cambiarEstadoNick();
  }

  ngOnInit(): void {
  }

  passwordValue() {
    console.log('ingreso al metodo');
    if (this.tabTabla1.isFilaInsertada()) {
      this.tabTabla1.setValor('password_segusu', this.tabTabla1.getValor('username_segusu'));
    }
  }

  /**
    * Activa o desactiva el cuadro de texto del nick
    */
  private cambiarEstadoNick() {
    if (this.tabTabla1.isFilaInsertada()) {
      this.tabTabla1.getColumna('username_segusu').setLectura(false);
    } else {
      this.tabTabla1.getColumna('username_segusu').setLectura(true);
    }
  }

  insertar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
      this.cambiarEstadoNick();
    }
  }
  async guardar(): Promise<void> {
    if (await this.tabTabla1.isGuardar()) {
      const data = this.tabTabla1.guardar();
      this.seguridadSvc.saveUser({data}).subscribe(res => {
        this.tabTabla1.onCommit();
        this.tabTabla1.loading = false;
        this.utilitarioSvc.agregarMensajeExito('Datos guardados exitosamente');
        this.tabTabla1.actualizar();

      }, (err) => {
        this.utilitarioSvc.cerrarLoading();
      });
    }
  }
  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    }
  }

  resetPassword(){
    if (this.utilitarioSvc.isUndefined(this.tabTabla1.seleccionada)) {
      const nombreUsuario = this.tabTabla1.getValor('nombre_segusu');
      const mensaje = 'Está seguro de que desea resetear la contraseña del usuario <strong> ' + nombreUsuario + ' </strong>? <br> <strong>Nota: </strong> La contraseña nueva será el nombre del usuario.';
      this.utilitarioSvc.confirmar(mensaje, () => this.confirmarResetPassword());
    }
    else {
      this.utilitarioSvc.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

  confirmarResetPassword(){
    this.utilitarioSvc.abrirLoading();
    const usuario = this.tabTabla1.getValor('username_segusu');
    const ideUsuario = this.tabTabla1.getValor('ide_segusu');
    const body= {
      uid_usuario: ideUsuario, nuevaContrasena: usuario
    }
    this.seguridadSvc.resetPassword(body).subscribe( res =>{
      this.utilitarioSvc.agregarMensajeExito('Contraseña reseteada exitosamente');
      this.utilitarioSvc.cerrarLoading();
    }, (err) => {
      this.utilitarioSvc.cerrarLoading();
    });
  }

}

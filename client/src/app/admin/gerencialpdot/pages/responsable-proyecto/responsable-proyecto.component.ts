import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu } from '@admin/shared/class/barmenu';
import { TablaComponent, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-responsable-proyecto',
  templateUrl: './responsable-proyecto.component.html',
  styles: [
  ]
})
export class ResponsableProyectoComponent extends BarMenu implements OnInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;

  constructor(private utilitarioSvc: UtilitarioService) {
    super();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.tabTabla1.setTabla('ge_responsable', 'ide_responsable', 1);
    this.tabTabla1.setTitulo('REGISTRO DE RESPONSABLES');
    this.tabTabla1.getColumna('ide_responsable').setNombreVisual('Código');
    this.tabTabla1.getColumna('ide_segusu').setNombreVisual('USUARIo');
    this.tabTabla1.getColumna('ide_segusu').setRequerido(true);
    this.tabTabla1.getColumna('nombre_gerepo').setRequerido(true);
    this.tabTabla1.getColumna('ide_segusu').setUnico(true);
    this.tabTabla1.getColumna('ide_segusu').setComentario('Usuario con el que accede al sistema el responsable');
    this.tabTabla1.getColumna('ide_segusu').setCombo('seg_usuario', 'ide_segusu', `username_segusu  ||' - '|| nombre_segusu`);
    this.tabTabla1.getColumna('ide_direccion').setCombo('ge_direccion', 'ide_direccion', 'detalle_direccion');
    this.tabTabla1.getColumna('ide_segusu').setAutocompletar();
    this.tabTabla1.getColumna('ide_direccion').setNombreVisual('dirección');
    this.tabTabla1.getColumna('nombre_gerepo').setNombreVisual('nombre');
    this.tabTabla1.getColumna('documento_gerepo').setNombreVisual('documento');
    this.tabTabla1.getColumna('email_gerepo').setNombreVisual('correo');
    this.tabTabla1.getColumna('celular_gerepo').setNombreVisual('celular');
    this.tabTabla1.getColumna('telefono_gerepo').setNombreVisual('telefono');
    this.tabTabla1.getColumna('observaciones_gerepo').setNombreVisual('Observaciones');
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.dibujar();

    await this.tabTabla2.setTabla('ge_objetivo_responsable', 'ide_objetivo_respo', 2);
    this.tabTabla2.getColumna('ide_objetivo').setNombreVisual('OBJETIVO DEL PROYECTO');
    this.tabTabla2.getColumna('ide_objetivo_respo').setNombreVisual('código');
    // this.tabTabla2.getColumna('detalle_objetivo').setNombreVisual('Meta');
    this.tabTabla2.getColumna('ide_objetivo').setCombo('ge_objetivo', 'ide_objetivo', 'detalle_objetivo');
    this.tabTabla2.getColumna('ide_objetivo').setAutocompletar();
    this.tabTabla2.getColumna('ide_objetivo').setRequerido(true);
    this.tabTabla2.getColumna('registra_proyecto').setNombreVisual('REGISTRA MATRIZ');
    this.tabTabla2.getColumna('registra_variacion').setNombreVisual('REGISTRA VARIACIONES');
    this.tabTabla2.getColumna('ide_objetivo_respo').setLongitud(10);
    this.tabTabla2.getColumna('registra_proyecto').setLongitud(15);
    this.tabTabla2.getColumna('ide_objetivo').setComentario('Seleccionar el objetivo del proyecto que va estar a cargo el responsable');
    this.tabTabla2.getColumna('registra_proyecto').setComentario('Permiso para que solo pueda registrar la matriz');
    this.tabTabla2.getColumna('registra_variacion').setLongitud(15);
    this.tabTabla2.getColumna('registra_variacion').setComentario('Permiso para que solo pueda registrar las variaciones de una matriz');

    this.tabTabla2.setTitulo('Permisos');
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
  async guardar(): Promise<void> {
    if (await this.tabTabla1.isGuardar()) {
      if (await this.unicoUsuarioResponsable('Restricción única, ya existe un registro con el usuario seleccionado')) {
        if (await this.tabTabla2.isGuardar()) {
          if(await this.unicoObjetivoResponsable('Restricción única, ya existe un registro del responsable con el objetivo del proyecto seleccionado')){
            await this.utilitarioSvc.guardarPantalla(this.tabTabla1, this.tabTabla2);
          }
        }
      }
     
    }
  }
  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    } else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.eliminar();
    }
  }

  unicoUsuarioResponsable(mensaje: string): Promise<boolean> {
    const sql = `	select ide_segusu from ge_responsable where ide_segusu = $1 and not ide_responsable=$2`;
    const usuario = this.tabTabla1.getValor('ide_segusu');
    const responsable = this.tabTabla1.getValor('ide_responsable');
    // console.log('usuario >>> ', usuario)
    return new Promise(resolve => {
      this.utilitarioSvc.getConsultaGenerica(sql, [usuario, responsable]).subscribe(res => {
        console.log(res);
        if (res.datos.length > 0) {
          this.utilitarioSvc.agregarMensajeAdvertencia(mensaje);
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, (err) => {
        resolve(false);
      })
    });
  }

  unicoObjetivoResponsable(mensaje: string): Promise<boolean> {
    const sql = `	select ide_responsable from ge_objetivo_responsable where ide_objetivo=$1 and ide_responsable=$2 and not ide_objetivo_respo=$3`;
    const responsable = this.tabTabla1.getValor('ide_responsable');
    const objetivo = this.tabTabla2.getValor('ide_objetivo');
    const pk = this.tabTabla2.getValor('ide_objetivo_respo');
    // console.log(objetivo, perspectiva);
    return new Promise(resolve => {
      this.utilitarioSvc.getConsultaGenerica(sql, [objetivo, responsable, pk]).subscribe(res => {
        if (res.datos.length > 0) {
          this.utilitarioSvc.agregarMensajeAdvertencia(mensaje);
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, (err) => {
        resolve(false);
      })
    });
  }
}

import { BarMenu } from 'src/app/admin/shared/class/barmenu';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TablaComponent, UtilitarioService } from 'ngprime-core';
import PDFObject from 'pdfobject';
import { GerencialpdotService } from '../../services/gerencialpdot.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matrizgerencial',
  templateUrl: './matrizgerencial.component.html',
  styles: [
  ]
})
export class MatrizgerencialComponent extends BarMenu implements OnInit, AfterViewInit {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  @ViewChild('tabTabla3', { static: false }) tabTabla3: TablaComponent;

  isOpenModal = false;
  isDibujarReporte = false;
  isLoading = false;
  isDibujar = false;
  isPrint = false;

  tienePermiso = false;

  lista1 = [{ value: '0', label: 'Relativo' }, { value: '1', label: 'Absoluto' }];
  lista2 = [{ value: '0', label: 'Decrece' }, { value: '1', label: 'Crece' }];
  semaforo = '';
  total = 0;
  urlImage = '';
  constructor(
    private utilitarioSvc: UtilitarioService,
    private gerencialpdotSVc: GerencialpdotService,
    private route: ActivatedRoute) {
    super();
    console.log(this.route.snapshot.data.usuarioPermiso)
    this.tienePermiso = this.route.snapshot.data.usuarioPermiso;
  }
  async ngAfterViewInit(): Promise<void> {

      // valido si el usuario tiene asignado un proyecto

      if(!this.tienePermiso){
        return this.utilitarioSvc.agregarMensajeAdvertencia('EL usuario ingresado no registra permisos para el registro de la matriz y variaciones del proyecto. Consulte con el Administrador');
      }

      await this.tabTabla1.setTablaServicio('gerencialpdot/getProyectoAsignados', [], 'ide_objetivo', 1, 'ide_objetivo,detalle_proyecto,detalle_objetivo');
      this.tabTabla1.setTitulo('METAS')
      this.tabTabla1.agregarRelacion(this.tabTabla2);
      this.tabTabla1.getColumna('ide_objetivo').setNombreVisual('código');
      this.tabTabla1.getColumna('detalle_proyecto').setNombreVisual('proyecto');
      this.tabTabla1.getColumna('detalle_objetivo').setNombreVisual('META');
      this.tabTabla1.getColumna('ide_objetivo').setLongitud(10);
      this.tabTabla1.getColumna('detalle_proyecto').setLongitud(25);
      this.tabTabla1.getColumna('detalle_objetivo').setLongitud(25);
      this.tabTabla1.setCampoOrden('ide_objetivo desc')
      this.tabTabla1.onPageChange = () => { this.actualizaSemaforo(); };
      this.tabTabla1.onSelectRow = () => {this.activarBloquear()};
      this.tabTabla1.setRows(3);
      this.tabTabla1.dibujar();

      await this.tabTabla2.setTabla('ge_matriz_frecuencia', 'ide_matriz', 2);
      this.tabTabla2.agregarRelacion(this.tabTabla3);
      this.tabTabla2.setTitulo('REGISTRO MATRIZ FRECUENCIA')
      this.tabTabla2.getColumna('ide_perspectiva').setCombo('ge_perspectiva', 'ide_perspectiva', 'detalle_perspectiva');
      this.tabTabla2.getColumna('ide_frecuencia').setCombo('ge_frecuencia', 'ide_frecuencia', 'detalle_frecuencia');
      this.tabTabla2.getColumna('abs_rela').setComboObject(this.lista1);
      this.tabTabla2.getColumna('crece_decre').setComboObject(this.lista2);
      this.tabTabla2.getColumna('meta').setValorDefecto(0);
      this.tabTabla2.getColumna('linea_base').setValorDefecto(0);
      this.tabTabla2.getColumna('ide_perspectiva').setUnico(true);
      this.tabTabla2.getColumna('ide_objetivo').setUnico(true);
      this.tabTabla2.getColumna('ide_perspectiva').setNombreVisual('Indicador');
      this.tabTabla2.getColumna('ide_frecuencia').setNombreVisual('frecuencia');
      this.tabTabla2.getColumna('abs_rela').setNombreVisual('abs rela');
      this.tabTabla2.getColumna('crece_decre').setNombreVisual('crece/decrece');
      this.tabTabla2.getColumna('meta').setNombreVisual('META');
      this.tabTabla2.getColumna('linea_base').setNombreVisual('linea base');
      this.tabTabla2.getColumna('detalle_linea_base').setNombreVisual('detalle linea base');
      this.tabTabla2.getColumna('detalle_meta').setNombreVisual('detalle meta');
      this.tabTabla2.getColumna('detalle_forma_control').setNombreVisual('detalle forma control');
      this.tabTabla2.getColumna('detalle_forma_control').setVisible(false);
      this.tabTabla2.getColumna('ide_matriz').setNombreVisual('código');
      this.tabTabla2.setTipoFormulario();
      this.tabTabla2.onPageChange = () => { this.actualizaSemaforo(); };
      this.activarDesactivarFormulario(true); 
      this.tabTabla2.dibujar();

      await this.tabTabla3.setTabla('ge_variacion', 'ide_variacion', 3);
      this.tabTabla3.setTitulo('REGISTRO VARIACIONES');
      this.tabTabla3.getColumna('valor_variacion').setMetodoBlur = () => { this.actualizaSemaforo(); };
      this.tabTabla3.getColumna('ide_variacion').setNombreVisual('código');
      this.tabTabla3.getColumna('valor_variacion').setNombreVisual('valor variación');
      this.tabTabla3.getColumna('fecha_variacion').setNombreVisual('fecha variación');
      this.tabTabla3.getColumna('ide_variacion').setLongitud(10);
      this.tabTabla3.getColumna('fecha_variacion').setLongitud(12);
      this.tabTabla3.onDibujar = () => { this.actualizaSemaforo(); }
      this.tabTabla3.setRows(5);
      this.tabTabla3.setLectura(true);
      this.tabTabla3.dibujar();
  }

  ngOnInit(): void {
  }

  async actualizaSemaforo(): Promise<string> {
    //console.log(bool);
    this.isLoading = true;
    this.total = 0;
    let valor = 0;
    this.tabTabla3.datos.forEach(async element => {
      this.total = this.total + Number(element['valor_variacion']);
    });
    const meta = this.tabTabla2.getValor('meta');
    const lineabase = this.tabTabla2.getValor('linea_base');
    valor = this.total;
    // console.log(valor, meta, lineabase);
    if (valor < lineabase && valor < meta) { // es linea roja
      return this.semaforo = 'rojo';
    }
    if (valor > lineabase && valor < meta) {  // es linea amrailla
      return this.semaforo = 'amarillo';
    }
    if (valor > meta) {
      return this.semaforo = 'verde';
    }
    if (valor === lineabase) {
      return this.semaforo = 'verde';
    }
  }

  insertar(): void {
    if (this.tabTabla2.isFocus()) {
      this.tabTabla2.insertar();
    } else if (this.tabTabla3.isFocus()) {
      this.tabTabla3.insertar();
    }
  }
  async guardar(): Promise<void> {
    if (this.tabTabla2.isGuardar()) {
      if (await this.validarProyectoPerspectivaUnico('Restricción única, ya existe  un registro de meta con el indicador seleccionado')) {
        if (this.tabTabla3.isGuardar()) {
          this.utilitarioSvc.guardarPantalla(this.tabTabla2, this.tabTabla3);
        }
      }
    }
  }
  eliminar(): void {
    if (this.tabTabla2.isFocus()) {
      this.tabTabla2.eliminar();
    } else if (this.tabTabla3.isFocus()) {
      this.tabTabla3.eliminar();
    }
  }

  validarProyectoPerspectivaUnico(mensaje: string): Promise<boolean> {
    const sql = `select ide_matriz from ge_matriz_frecuencia where ide_perspectiva=$1 and ide_objetivo=$2 and not ide_matriz=$3`;
    const objetivo = this.tabTabla1.getValor('ide_objetivo');
    const perspectiva = this.tabTabla2.getValor('ide_perspectiva');
    const pk = this.tabTabla2.getValor('ide_matriz');
    // console.log(objetivo, perspectiva);
    return new Promise(resolve => {
      this.utilitarioSvc.getConsultaGenerica(sql, [objetivo, perspectiva, pk]).subscribe(res => {
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

  subirArchivo() {
    this.isOpenModal = true;
  }

  abrirVisualizador() {
    this.utilitarioSvc.abrirLoading();
    this.gerencialpdotSVc.getReporte().subscribe( res => {
      this.urlImage = res;
      this.isDibujarReporte = true;
      this.utilitarioSvc.cerrarLoading();
    },(err => this.utilitarioSvc.cerrarLoading()));
  }

  closeDialogo(event) {
    this.isOpenModal = event;
  }

  actualizarTabla(event) {
    if (event) {
      this.tabTabla1.actualizar();
    }
  }

  abriModal(e) {
    const options = {
      height: "450px",

    };
    const myPDF = PDFObject.embed(this.urlImage, "#pdf", options);
  }


  activarDesactivarFormulario(estado : boolean){
    this.tabTabla2.getColumna('ide_perspectiva').setLectura(estado);
    this.tabTabla2.getColumna('ide_frecuencia').setLectura(estado);
    this.tabTabla2.getColumna('abs_rela').setLectura(estado);
    this.tabTabla2.getColumna('crece_decre').setLectura(estado);
    this.tabTabla2.getColumna('meta').setLectura(estado);
    this.tabTabla2.getColumna('linea_base').setLectura(estado);
    this.tabTabla2.getColumna('detalle_linea_base').setLectura(estado);
    this.tabTabla2.getColumna('detalle_meta').setLectura(estado);
    this.tabTabla2.getColumna('detalle_forma_control').setLectura(estado);
    this.tabTabla2.getColumna('ide_matriz').setLectura(estado);
  }

  async activarBloquear(){
    // console.log('Entro a permisos');
    const objetivo = this.tabTabla1.getValor('ide_objetivo');
    const bool = await this.gerencialpdotSVc.permisos(objetivo);
    // console.log(bool)
    if(bool[0].registra_proyecto){
      this.activarDesactivarFormulario(false);
      this.isPrint=true;
    }else{
      this.activarDesactivarFormulario(true);
      this.isPrint=false;;
    }
    if(bool[0].registra_variacion){
      this.tabTabla3.setLectura(false);
    }else{
      this.tabTabla3.setLectura(true);
    }

    this.actualizaSemaforo();
  }

}

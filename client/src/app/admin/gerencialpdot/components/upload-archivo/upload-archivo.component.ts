import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UtilitarioService } from 'ngprime-core';
import { NgProgressComponent } from 'ngx-progressbar';
import { FileUpload } from 'primeng/fileupload';
import * as XLSX from 'xlsx';
import { GerencialpdotService } from '../../services/gerencialpdot.service';

@Component({
  selector: 'app-upload-archivo',
  templateUrl: './upload-archivo.component.html',
  styleUrls: ['./upload-archivo.component.css']
})
export class UploadArchivoComponent implements OnInit {

  @ViewChild('upload', { static: false }) upload: FileUpload;

  @Input() display = false;
  @Input() datos: any;
  @Output() close = new EventEmitter<boolean>();
  @Output() isSubido = new EventEmitter<boolean>();

  tituloArchivo = '';
  isUpload = false;
  rowObject: any;
  fileInJson: any;
  isProgress = false;
  uploadedFiles: any[] = [];

  constructor(private utilitarioSvc: UtilitarioService, private gerencialpdotSvc: GerencialpdotService) { }

  ngOnInit(): void {
  }

  onUpload(event) {
    for (let file of event.files) {
      this.tituloArchivo = file.name;
      // this.uploadedFiles.push(file);
      let fileReader: FileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event: Event) => {
        let data = fileReader.result;
        let workbook2 = XLSX.read(data, { type: "binary" });
        workbook2.SheetNames.forEach(sheet => {
          this.rowObject = XLSX.utils.sheet_to_json(workbook2.Sheets[sheet]);
          this.fileInJson = JSON.stringify(this.rowObject, undefined, 4);
          // console.log("stringify", JSON.stringify(this.rowObject, undefined, 4))
          this.cargarDatosDelArchivo(this.rowObject);
        });
      }
    }
  }

  async cargarDatosDelArchivo(data) {
    this.isProgress = true;
    let newData = [];
    let contador = 0;

    for (const element of data) {
      contador++;
      // console.log('<<<<<< For registro >>>>>>', contador);
      // valido si existe el proyecto
      const ide_proyecto = await this.gerencialpdotSvc.existeProyecto(element.proyecto.toUpperCase());
      // console.log('retorno proyecto ', ide_proyecto);
      // valido si existe la meta
      const ide_objetivo = await this.gerencialpdotSvc.existeMeta(ide_proyecto, element.meta.toUpperCase());
      // console.log('retorno meta ', ide_objetivo);
      // valido si existe el indicador
      const ide_perspectiva = await this.gerencialpdotSvc.existeIndicador(element.indicador.toUpperCase(), element.abreviatura.toUpperCase());
      // console.log('retorno indicador ', ide_perspectiva);
      // valido si existe la frecuencia
      const ide_frecuencia = await this.gerencialpdotSvc.existeFrecuencia(element.frecuencia.toUpperCase());
      // console.log('retorno frecuencia ', ide_frecuencia);

      // inserto matriz matriz
      const ide_matriz = await this.gerencialpdotSvc.insertarMatrizFrecuencia(ide_objetivo, ide_perspectiva, ide_frecuencia, element.absoluto_relativo, element.crece_decrece, element.valor_meta,
        element.linea_base, element.detalle_linea_base, element.detalle_meta);
      // console.log('retorno matriz ', ide_matriz);
    }
    setTimeout(() => {
      this.upload.clear();
      this.isUpload = true;
      this.isSubido.emit(true);
      this.isProgress= false;
    }, 100);
  }

  closeModal() {
    this.display = false;
    this.isUpload = false;
    this.upload.clear();
    this.close.emit(false);
    this.uploadedFiles = [];
  }

}

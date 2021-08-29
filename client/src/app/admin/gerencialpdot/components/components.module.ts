import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from 'ngprime-core';
import { UploadArchivoComponent } from './upload-archivo/upload-archivo.component';
import { NgProgressModule } from 'ngx-progressbar';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';



@NgModule({
  declarations: [
    UploadArchivoComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    NgProgressModule
  ],
  exports: [
    UploadArchivoComponent,
    PdfViewerComponent
  ]
})
export class ComponentsModule { }

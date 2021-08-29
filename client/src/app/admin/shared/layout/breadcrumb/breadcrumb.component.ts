import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit {

  @Input() soloBreadcrums?= false;
  @Input() titulo?= '';

  ruta = [];

  isBotonInsertar = true;
  isBotonGuardar = true;
  isBotonEliminar = true;
  isQuitarBotones = false;

  get botonInsertar(): HTMLButtonElement {
    return (document.getElementById('botInsertar') as HTMLButtonElement);
  }
  get botonEliminar(): HTMLButtonElement {
    return (document.getElementById('botEliminar') as HTMLButtonElement);
  }
  get botonGuardar(): HTMLButtonElement {
    return (document.getElementById('botGuardar') as HTMLButtonElement);
  }

  // Eventos
  onInsertar?: (event?: any) => void;
  onEliminar?: (event?: any) => void;
  onGuardar?: (event?: any) => void;

  items = [
    {data: 'home', estilo: 'breadcrumb-item'},
    {data: 'seguridad', estilo: 'breadcrumb-item'},
    {data: 'usuario', estilo: 'breadcrumb-item'}
  ];

  constructor(private cdRef: ChangeDetectorRef) { }


  ngOnInit(): void {
  this.isBotonInsertar = true;
  }

  insertar(event): void {
    if (this.onInsertar) {
      this.onInsertar({ originalEvent: event });
    }
  }

  guardar(event): void {
    if (this.onGuardar) {
      this.onGuardar({ originalEvent: event });
    }
  }

  eliminar(event): void {
    if (this.onEliminar) {
      this.onEliminar({ originalEvent: event });
    }
  }

  quitarBotonInsertar(): void {
    this.botonInsertar.hidden = true;
    this.isBotonInsertar = false;
    this.cdRef.detectChanges();
  }

  quitarBotonGuardar(): void {
    this.botonGuardar.hidden = true;
    this.isBotonGuardar = false;
    this.cdRef.detectChanges();
  }

  quitarBotonEliminar(): void {
    this.botonEliminar.hidden = true;
    this.isBotonEliminar = false;
    this.cdRef.detectChanges();
  }

  quitarBotones(): void {
    this.isBotonInsertar = false;
    this.isBotonGuardar = false;
    this.isBotonEliminar = false;
    this.isQuitarBotones = true;
    this.cdRef.detectChanges();
  }

  setTitulo(title: string): void {
    this.titulo = title;
  }

}

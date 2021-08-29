import { Component, OnInit } from '@angular/core';
import { AuthService, UtilitarioService } from 'ngprime-core';
import { Usuario } from 'ngprime-core/lib/clases/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  fechaUltimoAcceso: string;
  pantallas: [];
  userAgent: any = null;
  usuario = [];
  user: Usuario;
  sistemaOperativo: any = null;
  dispositivo: string;
  ip: string;

  constructor(
    private authSvc: AuthService,
    private utilitarioSvc: UtilitarioService
  ) {
    authSvc.userLogueado();
    this.userAgent = this.utilitarioSvc.getUserAgent();
    this.usuario = authSvc.getUserData();
    this.user = authSvc.usuario;
    this.dispositivo = this.utilitarioSvc.getPlataforma();
    this.sistemaOperativo = this.utilitarioSvc.getSistemaOperativo();
  }

  ngOnInit(): void {
    this.fechaUltimoAcceso = localStorage.getItem('ultimoAcceso');
    this.ip = this.utilitarioSvc.getIp();
    this.authSvc.pantallasMasUsadas().subscribe(resp => {
      this.pantallas = resp.datos;
    });
  }

}

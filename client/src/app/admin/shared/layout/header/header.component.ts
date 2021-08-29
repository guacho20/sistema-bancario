import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ngprime-core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  usuario = [];
  fechaUltimoAcceso: string;

  constructor(private authSvc: AuthService) {
    this.usuario = authSvc.getUserData();
    this.fechaUltimoAcceso = localStorage.getItem('ultimoAcceso');
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authSvc.logout();
  }

  onClick(opcion): void {
    this.authSvc.isMenu = true;
    this.authSvc.setRuta(opcion);
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ngprime-core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent implements OnInit {

  usuario = [];

  constructor(private authSvc: AuthService) {
    this.usuario = authSvc.getUserData();
  }

  ngOnInit(): void {
  }

  onClick(opcion): void {
    this.authSvc.isMenu = true;
    this.authSvc.setRuta(opcion);
  }

}

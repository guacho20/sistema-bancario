import { Component, OnInit } from '@angular/core';
declare function customInitFunctions();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {
  public appVersion = '1.0';
  public currentYear = '2021';
  constructor() { }

  ngOnInit(): void {
  }

}

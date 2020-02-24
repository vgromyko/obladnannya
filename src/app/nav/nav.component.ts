import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  public title = "Obladnannya";
  public navData = [
    {"name": "Cards", "url":"/cards"},
    {"name": "Devices", "url":"/devises"},
    {"name": "Users", "url":"/users"}

    ]


  ngOnInit(): void {
  }

}

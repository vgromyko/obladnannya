import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {

  constructor() { }

  title  = '';
  token  = '';
  sid  = '';
  isGrid = false;
  lginlgout = '';
  loginData: any ;
  loginName = '';


  @Input() public isLogin = true ;
  @Output() public isLoginGhange = new EventEmitter();

  ngOnInit() { }

  logout(){
    this.loginData = null;
    this.isLogin = true;
    this.isGrid = false;
    this.token  = '';
    this.sid = '';
    this.lginlgout = '';
  }

}

import { Component, ViewChild , AfterViewInit , EventEmitter, Input ,Output} from '@angular/core';

import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxPasswordInputComponent } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons/angular_jqxbuttons';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { jqxExpanderComponent } from 'jqwidgets-ng/jqxexpander';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm',{static:false}) loginForm: jqxExpanderComponent;
  @ViewChild('mylogin',{static:false}) mylogin: jqxInputComponent;
  @ViewChild('password',{static:false}) password: jqxPasswordInputComponent;
  @ViewChild('lgnbutton',{static:false}) lgnbutton: jqxButtonComponent ;
  @ViewChild('loginValidatorReference',{static:false}) loginValidatorReference: jqxValidatorComponent;

  constructor(private apiService: ApiService) { }

//  public tokenValue : any = null ;
//  public token: any = null ;
  public apimess: any = null;
  public theme: string ="base";

    ngAfterViewInit(): void {
        // this.myPasswordInput.refresh();
      this.mylogin.createComponent(this.mylogin);
      this.password.createComponent(this.password);
      this.lgnbutton.createComponent(this.lgnbutton);
     // this.crtaccbutton.createComponent(this.crtaccbutton);
      this.loginValidatorReference.createComponent(this.loginValidatorReference);
    }
    rules: any[] = [
      { input: "#mylogin", message: "Login is required!", action: 'keyup, blur', rule: 'required' }
    ];
    
    @Input() public isCreate = false  ;
    @Output() public isCreateChange = new EventEmitter();

    buttonClicked(): void {
      this.requestLogin();
       //console.log( event );
    //   this.token = 'r769872340-982-35476123090-12354823-0498052182375324243dList' ;
    //   this.tokenChange.emit(this.token);
    //   this.loginDataChange.emit(this.token);
    //   this.loginValidatorReference.validate(document.getElementById('loginForm'));
    };



    @Input() public token  ;
    @Output() public tokenChange = new EventEmitter();
    @Output() public loginDataChange = new EventEmitter();
       

    requestLogin(){
      console.log("Start request Login");
      console.log(this.apiService.loginData);

      this.token = 12345;
      this.apimess = this.apiService.loginData;
      this.tokenChange.emit(this.token);
      this.loginDataChange.emit(this.apimess);

      return this.apiService.loginData ;


      this.apiService.getLogin(
          this.mylogin.val(),
          this.password.val()
         ).subscribe((data) => {
              if(data){
                this.token = 12345
                this.apimess = data;
                this.tokenChange.emit(this.token);
                this.loginDataChange.emit(this.apimess);
              //  crdList  = data ;
              //  this.token = crdList ;
                
              //  this.tokenChange.emit(this.token);
              //  this.loginDataChange.emit(data.data.data);
              //  this.loginValidatorReference.validate(document.getElementById('loginForm'));
              }
       },
        (error) => {
          this.token = error.name+' status:'+status;
          this.apimess  = error.message;
          this.tokenChange.emit(this.token);
          this.loginDataChange.emit(this.apimess);
        } 
      )


    }

    validationSuccess(event: any): void {
    //  console.log(event);
      this.loginForm.setContent('<span style="margin:20px;color:green;font-weight:bold;">'+this.apimess+'</span>');
  };

}



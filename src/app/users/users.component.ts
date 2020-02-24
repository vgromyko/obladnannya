import { Component, ViewEncapsulation , OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements AfterViewInit {

  @ViewChild('myGrid', {static: false}) myGrid: jqxGridComponent;

  constructor(private apiService: ApiService , private router: Router , private aComponent: AppComponent ) { }

  public theme = 'base';
  public sorttogglestates: any = 2;
  public isPermit: any = '';
  public myToken: string = "";
  public sid: string ="";
  public gridWidth: number  = 1000;

  ngAfterViewInit(): void{

    this.myToken = this.aComponent.token ;
    this.sid = this.aComponent.sid ;
    this.isPermit = this.aComponent.loginData ;
    if( this.isPermit ){
      this.myGrid.showloadelement();
      this.getUsers();
    }
  }


  editrow: number = -1;

  source: any = {
    localdata: null,
    datafields: [
      { name: 'user_id', type: 'int' },
      { name: 'name', type: 'string' },
      { name: 'gender', type: 'int' },
      { name: 'birthday', type: 'date' },
      { name: 'photo_exists', type: 'bool' },
      { name: 'pin', type: 'string' },
      { name: 'pin_exists', type: 'int' },
      { name: 'login_id', type: 'string' },
      { name: 'password_exists', type: 'bool'},
      { name: 'updated_count', type: 'int' },
      { name: 'last_modified', type: 'int' },
      { name: 'start_datetime', type: 'date' },
      { name: 'expiry_datetime', type: 'date' }, 
      { name: 'security_level', type: 'int' }, 
      { name: 'security_level', type: 'int' }, 
      { name: 'display_duration', type: 'int' },
      { name: 'display_count', type: 'int' },
      { name: 'permission', type: 'string' },
      { name: 'inherited', type: 'bool'},
      { name: 'user_group_id', type: 'string'},
      { name: 'disable', type: 'bool' },
      { name: 'expired', type: 'bool' },
      { name: 'fingerprint_template_count',  type: 'int' },
      { name: 'face_count',  type: 'int' },
      { name: 'card_count',  type: 'int' } 
    ],
    datatype: 'json',
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: 'User_Id', datafield: 'user_id', width: 40 },
    { text: 'Name', datafield: 'name', width: 90 },
    { text: 'Login', datafield: 'login_id', width: 90 },
    { text: 'Password',  columntype: 'checkbox', datafield: 'password_exists', align: 'center',width: 50},
    { text: 'Birthday', datafield: 'birthday', width: 90, align: 'left', cellsalign: 'right', cellsformat: 'yyyy-MM-dd' },
    { text: 'Gend', datafield: 'gender', width: 50, align: 'center',   
    cellsrenderer: function(row, column, value, data) {
      let result = "<div class=cl-c>M</div>";
      switch (value) {
        case 1:
          result = "<div class=cl-c>F</div>";
          break;
      }
      return result;
    } 
  },
    { text: 'photo', columntype: 'checkbox', datafield: 'photo_exists', align: 'center',width: 50},
    { text: 'Pin ex', columntype: 'checkbox', datafield: 'pin_exists', align: 'center',width: 50},
    { text: 'Pin', datafield: 'pin', minwidth:150 },
    { text: 'Upd', datafield: 'updated_count',width: 50},
    { text: 'Sec', datafield: 'security_level', width: 50 },
    { text: 'Dis', columntype: 'checkbox', datafield: 'disabled', align: 'center',width: 50},
    { text: 'Exp', columntype: 'checkbox', datafield: 'expired', align: 'center',width: 50},
    { text: 'Face', datafield: 'face_count', width: 40 },
    { text: 'Card', datafield: 'card_count', width: 40 }
  ];



  myGridOnContextMenu(): boolean {
    return false;
  }



getUsers(){

  this.source.localdata =  this.apiService.usrData.UserCollection.rows ; 
  this.myGrid.updatebounddata()  ;

/*
 
  this.apiService.getUsers(this.sid)
    .subscribe((data) => {
      this.source.localdata = data.UserCollection.rows;
      this.myGrid.updatebounddata()  ;
    });
*/
}

  updatefilterconditions = (type: string, defaultconditions: any): string[] => {
    let stringcomparisonoperators = ['CONTAINS', 'DOES_NOT_CONTAIN'];
    let numericcomparisonoperators = ['LESS_THAN', 'GREATER_THAN'];
    let datecomparisonoperators = ['LESS_THAN', 'GREATER_THAN'];
    let booleancomparisonoperators = ['EQUAL', 'NOT_EQUAL'];
    switch (type) {
        case 'stringfilter':
            return stringcomparisonoperators;
        case 'numericfilter':
            return numericcomparisonoperators;
        case 'datefilter':
            return datecomparisonoperators;
        case 'booleanfilter':
            return booleancomparisonoperators;
    }
  }


  ready = (): void => {
      let localizationObject = {
          filterstringcomparisonoperators: ['contains', 'does not contain'],
          // filter numeric comparison operators.
          filternumericcomparisonoperators: ['less than', 'greater than'],
          // filter date comparison operators.
          filterdatecomparisonoperators: ['less than', 'greater than'],
          // filter bool comparison operators.
          filterbooleancomparisonoperators: ['equal', 'not equal']
      }

      this.myGrid.localizestrings(localizationObject);
  }

  onSelect(users){
    this.router.navigate(['/users']);
  }

}

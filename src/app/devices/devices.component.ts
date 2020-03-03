import { Component, ViewEncapsulation , OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DevicesComponent implements AfterViewInit {
 
  @ViewChild('myGrid', {static: false}) myGrid: jqxGridComponent;

  constructor(private apiService: ApiService , private router: Router , private aComponent: AppComponent ) { }

  public theme = 'base';
  public sorttogglestates: any = 2;
  public isPermit: any = '';
  public myToken: string = "";
  public sid: string = "";
  public gridWidth: number  = 1000;

  ngAfterViewInit(): void{

      this.myToken = this.aComponent.token ;
      this.sid = this.aComponent.sid ;
      this.isPermit = this.aComponent.loginData ;
      if( this.isPermit ){
        this.myGrid.showloadelement();
        this.getDevices();
      }
  }

getWidth(): any {
    if (document.body.offsetWidth < this.gridWidth ) {
      return '90%';
    }
    return this.gridWidth;
}

editrow: number = -1;

source: any = {
    localdata: null,
    datafields: [
      { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'device_type_id', type: 'any' },
        { name: 'status',  type: 'int' },
        { name: 'device_group_id', type: 'any' },
        { name: 'version', type: 'any' },
        { name: 'lan', type: 'any' } 
    ],
    datatype: 'json',

};

dataAdapter: any = new jqx.dataAdapter(this.source);

columns: any[] = [
  { text: 'ID', datafield: 'id', width: 100 },
  { text: 'Name', datafield: 'name', width: 280 },
  { text: 'Type', datafield: 'device_type_id', width: 120 , 
    cellsrenderer: function(row, column, value, data) {
    return "<div class=cl-l>"+value.id +":"+value.name+"</div>+" }
  },
  { text: 'Status', columntype: 'checkbox', datafield: 'status', align: 'center',width: 50},
  { text: 'Group', datafield: 'device_group_id', width: 120 ,
    cellsrenderer: function(row, column, value, data) {
    return "<div class=cl-l>"+value.id +":"+value.name+"</div>" }
  },
  { text: 'Version', datafield: 'version', width:150,
  cellsrenderer: function(row, column, value, data) {
    return "<div class=cl-l>"+value.hardware +":"+value.product_name+"</div>" }
  },
  { text: 'LAN', datafield: 'lan', minwidth:120,
  cellsrenderer: function(row, column, value, data) {
    return "<div class=cl-l> IP:"+value.ip+"</div>" }
  } 
];



myGridOnContextMenu(): boolean {
  return false;
}


getDevices(){
/*
  this.source.localdata =  this.apiService.devsData.DeviceCollection.rows ; 
  this.myGrid.updatebounddata()  ;
*/
  console.log('getDevices sid='+this.sid);
  this.apiService.getDevices(this.sid)
     .subscribe((data) => {
    this.source.localdata = data.DeviceCollection.rows;
    this.myGrid.updatebounddata()  ;
   }) ;



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
  };


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

  onSelect(devices){
    this.router.navigate(['/devices']);
  }

}

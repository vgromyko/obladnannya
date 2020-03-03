
import { Component, ViewEncapsulation , OnInit, ViewChild, AfterViewInit  } from '@angular/core'; 
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CardsComponent implements AfterViewInit {
 
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
      this.getCardsData();
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
    localdata: {},
    datafields: [
      { name: 'id', type: 'int' },
        { name: 'card_id', type: 'int' },
        { name: 'display_card_id', type: 'int' },
        { name: 'status',  type: 'int' },
        { name: 'is_blocked', type: 'bool' },
        { name: 'is_assigned', type: 'bool' },
        { name: 'card_type', type: 'any' },
        { name: 'mobile_card', type: 'bool' },
        { name: 'issue_count',  type: 'int' },
        { name: 'card_mask',  type: 'int' },
        { name: 'wiegand_format_id',  type: 'any' }
    ],
    datatype: 'json'
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: 'ID', datafield: 'id', width: 50 },
    { text: 'Card_id', datafield: 'card_id', width: 100 },
    { text: 'Display_card_id', datafield: 'display_card_id', width: 150 },
    { text: 'Status', datafield: 'status', width: 50 },
    { text: 'Blocked', columntype: 'checkbox', datafield: 'is_blocked', align: 'center',width: 60},
    { text: 'Assigned', columntype: 'checkbox', datafield: 'is_assigned', align: 'center',width: 60},
    { text: 'Mobil', columntype: 'checkbox', datafield: 'mobil_card', align: 'center',width: 60},
    { text: 'Wiegand', datafield: 'wiegand_format_id',width:60,
    cellsrenderer: function(row, column, value, data) {
      return "<div class=cl-l>"+value.id+"</div>" }
    }, 
    { text: 'Card type', datafield: 'card_type', minwidth:120,
    cellsrenderer: function(row, column, value, data) {
      return "<div class=cl-l>id="+value.id+" : type="+value.type+" : name="+value.name+"</div>" }
    } 
  ];



  myGridOnContextMenu(): boolean {
    return false;
  }

  getCardsData(){
  /* 
  //  this.source.localdata =  this.apiService.crdData.CardCollection.rows ; 
  //  this.myGrid.updatebounddata()  ;
 */
  console.log('getCards sid='+this.sid);
 
    this.apiService.getCards(this.sid)
    .subscribe((data) => {
        this.source.localdata =  data.CardCollection.rows ; 
        this.myGrid.updatebounddata()  ;
    }, (error) => {

    } ) ;

    
  }


  updatefilterconditions = (type: string, defaultconditions: any): string[] => {
    const stringcomparisonoperators = ['CONTAINS', 'DOES_NOT_CONTAIN'];
    const  numericcomparisonoperators = ['LESS_THAN', 'GREATER_THAN'];
    const  datecomparisonoperators = ['LESS_THAN', 'GREATER_THAN'];
    const  booleancomparisonoperators = ['EQUAL', 'NOT_EQUAL'];
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
    const  localizationObject = {
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

  onSelect(cards){
    this.router.navigate(['/cards']);
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DevicesComponent } from './devices/devices.component';
import { CardsComponent } from './cards/cards.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';


import { HttpClientModule } from '@angular/common/http';

import { jqxPasswordInputModule } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxExpanderModule } from 'jqwidgets-ng/jqxexpander';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';

import { jqxCheckBoxModule } from 'jqwidgets-ng/jqxcheckbox';  ;
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxMenuModule } from 'jqwidgets-ng/jqxmenu';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxMaskedInputModule } from 'jqwidgets-ng/jqxmaskedinput';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    DevicesComponent,
    CardsComponent,
    UsersComponent,
    LoginComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserModule,
    AppRoutingModule,

    CommonModule,
    HttpClientModule,

    jqxPasswordInputModule, 
    jqxExpanderModule,
    jqxInputModule,
    jqxValidatorModule,
    jqxDropDownListModule,
    jqxDateTimeInputModule,
    jqxButtonModule, 
    jqxGridModule  ,
    jqxMenuModule, 
    jqxNumberInputModule, 
    jqxWindowModule,
    jqxMaskedInputModule,
    jqxCheckBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

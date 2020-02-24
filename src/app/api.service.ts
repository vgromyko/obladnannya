import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'; 

import CardsData from '../assets/cards.json';
import UsersData from '../assets/users.json';
import DevicesData from '../assets/devices.json';
import LoginResponceData from '../assets/loginresponce.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private httpClient: HttpClient) { }

  //private baseUrl: string = 'http://www.qrz.co.il/studio/vgromyko.info/projects/api/index.php?key=backgroundFFFFFF';
  private baseUrl: string = 'http://localhost:4200';

  public crdData: any = CardsData;
  public usrData: any = UsersData;
  public devsData: any = DevicesData;
  public loginData: any = LoginResponceData;

  getLogin(login,passw){

    const loginRequest = '{"User":{"user_id":"'+login+'","password":"'+passw+'"}}' ;

    const  getHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this. httpClient.
      post( this.baseUrl , loginRequest , getHttpOptions  )
      .pipe(map( data => data ));
    }


  public getCards(sid): Observable<any> {

    const cardRequest = {CardCollection:"get"} ;

    const  posHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'bs-session-id': sid
      })
    };


    return this.crdData ;

    return this.httpClient
      .post(
        this.baseUrl,
        cardRequest ,
        posHttpOptions
        ).pipe(map(data => data));
  }

  public getUsers(sid): Observable<any> {

    const usersRequest = { UserCollection:"get" } ;

    const  posHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'bs-session-id': sid
      })
    };

    return this. httpClient
      .post(
        this.baseUrl,
        usersRequest ,
        posHttpOptions
        ).pipe(map(data => data));
  }


  public getDevices(sid): Observable<any> {

    const devicesRequest = {DevicesCollection:"all"} ;

    const  posHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'bs-session-id': sid
      })
    };

    return this. httpClient
      .post(
        this.baseUrl,
        devicesRequest,
        posHttpOptions
        ).pipe(map(data => data));
  }

}

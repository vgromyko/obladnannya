import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders ,HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators'; 

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
  private baseUrl: string = 'http://94.100.214.127:8080/api/';

  public crdData: any = CardsData;
  public usrData: any = UsersData;
  public devsData: any = DevicesData;
  public loginData: any = LoginResponceData;

  getLogin(login,passw){

    const loginRequest = {"User": {"login_id": login ,"password": passw}} ;

    return this. httpClient.
      post( this.baseUrl + 'login' ,
          loginRequest ,{
          headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'http://94.100.214.127:8080',
            'Fetch-Mode': 'cors'
          }),
          observe: 'response',
          responseType: 'json'
        })
      .pipe(tap( res => res ));
    }




  public getCards(sid): Observable<any> {

    const cardRequest = {CardCollection:{}} ;

    return this.httpClient
      .post(
        this.baseUrl + 'cards',
        cardRequest ,{
          headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Sec-Fetch-Mode':'cors',
            'bs-session-id': sid 
          }),
          observe: 'response',
          responseType: 'json' 
        }).pipe(map(data => data));
  }

  public getUsers(sid): Observable<any> {
/*
  // name, user_id, user_group_id, disabled, start_datetime, expiry_datetime.
*/
    const usersRequest = {
      "User": {
        "name": "test7",
        "email": "test7@suprema.co.kr",
        "phone": "010-1111-2222",
        "user_id": "8",
        "user_group_id": {
          "id": 1
        },
        "disabled": "false",
        "start_datetime": "2001-01-01T00:00:00.00Z",
        "expiry_datetime": "2030-12-31T23:59:00.00Z",
        "permission": {
          "id": "",
          "name": "",
          "description": "string",
          "operators": [
            {
              "name": "",
              "owner_id": "",
              "user_id": ""
            }
          ]
        },
        "access_groups": [
          {
            "name": "",
            "id": null,
            "$$hashKey": ""
          }
        ],
        "login_id": "",
        "password": "",
        "fingerprint_templates": [
          {
            "template0": "",
            "template1": "",
            "finger_mask": false,
            "isNew": false
          }
        ],
        "credentials": {
          "faces": [
            {
              "raw_image": "",
              "templates": [
                {
                  "template": ""
                }
              ],
              "flag": "",
              "useProfile": "",
              "index": 0
            }
          ]
        },
        "cards": [
          {
            "card_type": {
              "id": "",
              "name": "",
              "type": ""
            },
            "card_id": "",
            "display_card_id": "",
            "id": "",
            "$$hashKey": ""
          }
        ]
      }
    } ;


    return this. httpClient
      .post(
        this.baseUrl+ 'users',
        usersRequest,{
          headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Sec-Fetch-Mode': 'cors',
          'bs-session-id': sid
        }),
        observe: 'response',
        responseType: 'json'
      }).pipe(map(data => data));
  }


  public getDevices(sid): Observable<any> {

    return this. httpClient
      .get(
        this.baseUrl + 'devices',  {
          headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Sec-Fetch-Mode':'cors',
            'bs-session-id': sid 
          }),
          observe: 'response',
          responseType: 'json' 
        }).pipe(map(data => data));
  }


}

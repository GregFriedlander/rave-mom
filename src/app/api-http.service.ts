import { Injectable } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiHttpService {

  constructor(private _http: HttpClient) { 
    var obj;
    // this.getJSON().subscribe(data => obj=data, error => console.log(error));
  }

  // public getJSON(): Observable<any> {
  //   return this.http.get("../map.html")
  //   .map((res:any) => res.json())
  //   .catch((error) => console.log(error));
  // }

  getInfo(){
    return this._http.get('http://34.239.104.74//user.geojson')
    // return this._http.get('../userData.json')
  }

}

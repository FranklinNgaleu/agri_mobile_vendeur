import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  // private API_URL = environment.API_URL;

  //url = "https://barber1.herokuapp.com/api/auth"
  url='http://127.0.0.1:8000/api/auth'
  //private rootURL = environment.url;
  constructor(private http: HttpClient) {

  }

  // login(userData:any){
  //   return this.http.post(this.API_URL + 'login', {userData})
  // }

  login(userData: any): Observable<any>{
    return this.http.post<any>(`${this.url}/login`, userData);
  }

  register(userData: any): Observable<any>{
    return this.http.post<any>(`${this.url}/register`, userData);
  }

  terminer_register(userData: any,token:any): Observable<any>{
    return this.http.post<any>(`${this.url}/end_register/${token}`, userData);
  }

  verifyToken(code:any ):Observable<any> {
    return this.http.get<any>(`${this.url}/checkend_register/${code}`)
  }

  // logout(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}/logout`, data);
  // }

  logout():Observable<any>{
    return this.http.post<any>(`${this.url}/logout`,{})
    
  }

  verify(userId:any ,code:any ):Observable<any> {
    return this.http.get<any>(`${this.url}verify/${userId}/${code}`)
  }

  ResendCode(userId:any):Observable<any> {
    return this.http.get<any>(`${this.url}refreshcode/${userId}`)
  }
}

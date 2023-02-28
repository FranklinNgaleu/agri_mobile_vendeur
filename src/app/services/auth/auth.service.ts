import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  // private API_URL = environment.API_URL;

  rootURL = `${environment.API_URL}`;
  constructor(private http: HttpClient) {

  }

  // login(userData:any){
  //   return this.http.post(this.API_URL + 'login', {userData})
  // }

  login(userData: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}/login`, userData);
  }

  register(userData: any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}/register`, userData);
  }

  terminer_register(userData: any,token:any): Observable<any>{
    return this.http.post<any>(`${this.rootURL}/end_register/${token}`, userData);
  }

  verifyToken(code:any ):Observable<any> {
    return this.http.get<any>(`${this.rootURL}/checkend_register/${code}`)
  }

  signOut(data: any): Observable<any> {
    return this.http.post<any>(`${this.rootURL}/logOut.php`, data);
  }

  verify(userId:any ,code:any ):Observable<any> {
    return this.http.get<any>(`${this.rootURL}verify/${userId}/${code}`)
  }

  ResendCode(userId:any):Observable<any> {
    return this.http.get<any>(`${this.rootURL}refreshcode/${userId}`)
  }
}

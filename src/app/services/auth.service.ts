import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login = false;
  admin = false;
  suser = false;
  userdata: any;

  tokenVal = localStorage.getItem('token');
  header = new HttpHeaders({
    'Authorization': `Bearer ${this.tokenVal}`,
  });
  
  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

   loginUser(data: any) {
      return this.http.post(this.API_URL + 'login', data);
   }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../auth/connexion/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public formData! : FormGroup;
  islogin = false;
  admin = false;
  vendeur = false;
  list! :User[];

  
  url = "https://barber01-acc54c1e7bc9.herokuapp.com/api/auth"
  //url='http://127.0.0.1:8000/api/auth'
  //private API_URL = environment.url;
  constructor(
    private http: HttpClient
  ) { }

  registerUser(id: number): Observable<Object> {
    return this.http.post(this.url + 'register',id);
  }

  login(email: any,password: any){
    return this.http.post(this.url + 'login', {email,password})
  }

  logoutUser(id:number) {
    return this.http.post(this.url + 'logout',id);
  }
}

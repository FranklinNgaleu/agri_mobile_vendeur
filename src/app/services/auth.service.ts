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


  
  private API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  registerUser(id: number): Observable<Object> {
    return this.http.post(this.API_URL + 'register',id);
  }

  login(email: any,password: any){
    return this.http.post(this.API_URL + 'login', {email,password})
  }
}

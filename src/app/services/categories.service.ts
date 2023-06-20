import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../home/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  //apiUrl = 'http://localhost:8000/api/getCategories'
  apiUrl = 'https://barber01-acc54c1e7bc9.herokuapp.com/api/getCategories'

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserHelper } from '../helpers/user';
import { Produit } from '../home/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  userData = UserHelper.getUser()?.user;
  apiUrl = 'https://barber1.herokuapp.com/api/index'
  apiUrl2 = 'https://barber1.herokuapp.com/api/addProduit/'
  apiUrl3 = 'https://barber1.herokuapp.com/api/updateProduit/'
  apiUrl4 = 'https://barber1.herokuapp.com/api/deleteProduit/'
  apiUrl5 = 'https://barber1.herokuapp.com/api/getProduitByUserIDAndCategory/'
   //apiUrl = 'http://localhost:8000/api/index'
   //apiUrl2 = 'http://localhost:8000/api/addProduit/'
   //apiUrl3 = 'http://localhost:8000/api/updateProduit/'
   //apiUrl4 = 'http://localhost:8000/api/deleteProduit/'
  //apiUrl5 = 'http://localhost:8000/api/getProduitByUserIDAndCategory/'
  
  constructor(
    private http: HttpClient
  ) { }

  getProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiUrl);
  }

  addProduit(produit:any, cat_id:number): Observable<any>{
    return this.http.post<any>(this.apiUrl2 + cat_id,produit);
  }

  updateProduit(produitId:number, produit:Produit): Observable<Produit>{
    return this.http.put<Produit>(this.apiUrl3 + produitId, produit);
  }

  deleteProduit(produitId:number):Observable<Produit>{
    return this.http.delete<Produit>(this.apiUrl4 + produitId);
  }

  getProduitByUserIDAndCategory(id:number,category:string):Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiUrl5 + id +'/'+ category);
  }
}
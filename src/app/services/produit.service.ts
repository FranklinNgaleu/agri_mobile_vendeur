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
  apiUrl = 'http://localhost:8000/api/index'
  apiUrl2 = 'http://localhost:8000/api/addProduit'
  apiUrl3 = 'http://localhost:8000/api/updateProduit'
  apiUrl4 = 'http://localhost:8000/api/getProduitByUserId'
  
  constructor(
    private http: HttpClient
  ) { }

  getProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiUrl);
  }

  addProduit(produit:Produit): Observable<Produit>{
    return this.http.post<Produit>(this.apiUrl2,produit);
  }

  updateProduit(produitId:number, produit:Produit): Observable<Produit>{
    return this.http.put<Produit>('http://127.0.0.1:8000/api/updateProduit/'+produitId, produit);
  }

  deleteProduit(produitId:number):Observable<Produit>{
    return this.http.delete<Produit>('http://127.0.0.1:8000/api/deleteProduit/'+produitId);
  }

  getProduitByUserID(id:number):Observable<Produit[]>{
    return this.http.get<Produit[]>('http://localhost:8000/api/getProduitByUserId/' + id );
  }
}
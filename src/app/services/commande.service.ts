import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../pages/order/order';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  //apiUrl = 'http://localhost:8000/api/OrderBySellerOnline'
  apiUrl = 'https://barber01-acc54c1e7bc9.herokuapp.com/api/OrderBySellerOnline'
  apiUrl2 = 'https://barber01-acc54c1e7bc9.herokuapp.com/api/acceptOrder/'
  apiUrl3 = 'https://barber01-acc54c1e7bc9.herokuapp.com/api/rejectOrder/'

rootURL = 'https://barber01-acc54c1e7bc9.herokuapp.com/api/'
  constructor(
    private http: HttpClient
  ) { }

  // Récupérer toutes les commandes d'un utilisateur
  listOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Modifier le statut à "accepter"
  ValiderCommande(orderId: number): Observable<any> {
    return this.http.put<any>(this.apiUrl2 + orderId, {}) ;
  }
  
  // Modifier le statut à "refuser"
  RefuserCommande(orderId: number): Observable<any> {
    return this.http.put<any>(this.apiUrl3 + orderId, {});
  }

  rejected(orderId: number): Observable<any> {
    return this.http.put<any>(`${this.rootURL}rejectOrder/${orderId}`,{});
  }

  accepted(orderId: number): Observable<any> {
    return this.http.put<any>(`${this.rootURL}acceptOrder/${orderId}`,{});
  }
}

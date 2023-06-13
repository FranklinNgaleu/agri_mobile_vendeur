import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  //apiUrl = 'http://localhost:8000/api/OrderBySellerOnline'
  apiUrl = 'https://barber1.herokuapp.com/api/OrderBySellerOnline'
  apiUrl2 = 'https://barber1.herokuapp.com/api/acceptOrder/'
  apiUrl3 = 'https://barber1.herokuapp.com/api/rejectOrder/'

  constructor(
    private http: HttpClient
  ) { }

  // Récupérer toutes les commandes d'un utilisateur
  listOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // // Modifier le statut d'une commande
  // updateOrderStatus(orderId: number, data: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl2}orders/${orderId}/status`, data);
  // }

  // Modifier le statut à "accepter"
  ValiderCommande(orderId: number): Observable<any> {
    return this.http.put<any>(this.apiUrl2 + orderId, {}) ;
  } 

  // Modifier le statut à "refuser"
  RefuserCommande(orderId: number): Observable<any> {
    return this.http.put<any>(this.apiUrl3 + orderId, {});
  }
}

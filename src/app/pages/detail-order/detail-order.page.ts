import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { Order } from '../order/order';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  order : any
  commandeSelect : any;
  constructor(
    public orderService : CommandeService
  ) { }

  ngOnInit() {
    let commande = localStorage.getItem("com");
    this.commandeSelect = JSON.parse(commande!);

    console.log(this.commandeSelect)
  }

  async valider(order:any){
    this.orderService.accepted(this.commandeSelect.id).toPromise().then((data: any)=>{
      console.log(data)
    });
  }

  annuler(order : any){
    this.orderService.rejected(this.commandeSelect.id).toPromise().then((data: any)=>{
      console.log(data)
    });
  }


}


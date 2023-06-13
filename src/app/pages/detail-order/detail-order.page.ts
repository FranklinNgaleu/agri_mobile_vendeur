import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  commandeSelect : any;
  constructor(
    public orderService : CommandeService
  ) { }

  ngOnInit() {
    let commande = localStorage.getItem("com");
    this.commandeSelect = JSON.parse(commande!);

    console.log(this.commandeSelect)
  }

  valider(){
    this.orderService.ValiderCommande(this.commandeSelect.id).subscribe((response : any) => {})
  }

  annuler(){
    this.orderService.RefuserCommande(this.commandeSelect.id).subscribe((response : any) => {})
  }


}

import { Component, OnInit } from '@angular/core';
import { UserHelper } from 'src/app/helpers/user';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  commandes : any[] = [];
  userData : any;

  constructor(
    public orderService : CommandeService,
  ) { }

  ngOnInit() {
    this.getListOfCommandes();

    this.userData = UserHelper.getUser()?.user;
  }

  getListOfCommandes(){
    this.orderService.listOrders().subscribe((response : any) => {
      response.forEach(( element : any) => {
      if(element.seller_name == this.userData.name && element.status === "Accepté"){
        this.commandes.push(element)
      }
      console.log(this.commandes)
     });
    })
  }

}

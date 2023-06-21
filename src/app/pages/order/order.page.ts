import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHelper } from 'src/app/helpers/user';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
   
  commandes : any[] = [];
  userData : any;
  
  order : any
  
  
  constructor(
    public orderService : CommandeService,
    private router : Router
  ){}


  ngOnInit() {
    this.getListOfCommandes();

    this.userData = UserHelper.getUser()?.user;
  }

  getListOfCommandes(){
    this.orderService.listOrders().subscribe((response : any) => {
      response.forEach(( element : any) => {
      if(element.seller_name == this.userData.name && element.status === "En_cours"){
        this.commandes.push(element)
      }
      console.log(this.commandes)
     });
    })
  }

  view(com: any){
    localStorage.setItem("com", JSON.stringify(com));
    this.router.navigate(['/detail-order']);
  }  
}

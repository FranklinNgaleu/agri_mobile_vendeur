import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
    public orderService : CommandeService
  ) { }

  ngOnInit() {
    let commande = localStorage.getItem("com");
    this.commandeSelect = JSON.parse(commande!);

    //console.log(this.order.id)
    console.log(this.commandeSelect)
  }

  async valider(order : any){
    order = this.commandeSelect
    console.log(order.id)
    this.orderService.accepted(order.id).toPromise().then((data: any)=>{
      console.log(data)
    });
  }

  // async valider(order:any) {
  //   const alert = await this.alertController.create({
  //     header: order.order_number,
  //     message: 'Si vous avez apprécié votre coiffure cliqué sur "Oui"',
  //     buttons: [
  //       {
  //         text: 'Oui',
  //         handler: () => {
  //           this.orderService.accepted(order.order_number).toPromise().then((data)=>{
  //             console.log(data)
  //           });
  //           // Ajoutez ici les actions à effectuer lorsque l'utilisateur clique sur le bouton OK
  //           console.log('Bouton OK cliqué');
  //         }
  //       },
  //       {
  //         text: 'Non',
  //         handler: () => {
  //           // Ajoutez ici les actions à effectuer lorsque l'utilisateur clique sur le bouton Non
  //           console.log('Bouton Non cliqué');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  annuler(commandeSelect : any){
    // this.orderService.rejected(this.order.id).toPromise().then((data: any)=>{
    //   console.log(data)
    // });
  }


}


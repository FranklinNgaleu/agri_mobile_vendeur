import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { Produit } from '../home/produit.model';
import { AjouterProduitPage } from '../pages/ajouter-produit/ajouter-produit.page';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() produit!: Produit;

  constructor(
    private modalCtrl: ModalController,
    private produitService: ProduitService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    // this.onDeleteProduct();
    // this.openEditModal();
    console.log(this.produit)
  }

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.produit, role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component:AjouterProduitPage,
      componentProps: {produit: this.produit}
    });
    await modal.present();
    console.log(this.produit)

    const { data } = await modal.onDidDismiss();
    if (data && data.produit) {
      const produitModifie = data.produit;
      console.log(produitModifie);
  
      // Appeler une méthode du service backend pour mettre à jour le produit en base de données
      this.produitService.updateProduit(produitModifie.id, produitModifie).subscribe(
        (produitMisAJour) => {
          console.log('Produit mis à jour en base de données :', produitMisAJour);
          this.produit = produitMisAJour;
        },
        (erreur) => {
          console.error('Erreur lors de la mise à jour du produit en base de données :', erreur);
        }
      );
    }

    // const {data: updateProduit} = await modal.onDidDismiss();
    // if(updateProduit){
    //   this.produit = updateProduit;
    // }
    
  }

  ionViewDidEnter(){
    //this.onDeleteProduct();
    //this.openDetailModal(produit: Produit);
  }
  async onDeleteProduct(){
    const loading = await this.loadingCtrl.create({message: 'Deleting...'});
    loading.present();
    this.produitService.deleteProduit(this.produit.id)
    .pipe(take(1))
    .subscribe(() => {
      loading.dismiss();
      this.closeModal('delete ');
    });
    this.router.navigate(['/tab/home']);
  }

}

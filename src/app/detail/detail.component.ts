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

    const {data: updatedProduit} = await modal.onDidDismiss();
    if(updatedProduit){
      this.produit = updatedProduit;
    }
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

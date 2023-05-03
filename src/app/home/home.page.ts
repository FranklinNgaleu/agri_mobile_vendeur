import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { map, Observable, pipe } from 'rxjs';
import { ProduitService } from '../services/produit.service';
import { Produit } from './produit.model';
import { tap } from 'rxjs';
import { DetailComponent } from '../detail/detail.component';
//import { userInfo } from 'os';
import { UserHelper } from '../helpers/user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAvaiMode = false;
  produits$!: Observable<Produit[]>;
  userData:any;
  listProduit:any;
  categories:any;
  //produits = [];
  user:any
  produits: any;
  a:any;
  userOut:any;



  constructor(
    private router: Router,
    private http: HttpClient,
    private produitService: ProduitService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private authService : AuthService
  ) {}

  add(){
    this.router.navigate(['/tab/ajouter-produit'])
  }
  delete(){}
  edit(){
    this.router.navigate(['/tab/modifier-produit'])
  }


  async ngOnInit(){

    this.userData = UserHelper.getUser()?.user;

    let prod = localStorage.getItem("cat");
    this.categories = JSON.parse(prod!);

    const loading = await this.loadingCtrl.create({ message: 'Loading...'});
    //loading.present();
    this.produits$ = this.produitService.getProduitByUserIDAndCategory(this.userData.id,this.categories.title)
    .pipe(
      tap((produits) => {
        //loading.dismiss();
        // produits = produits.filter((it) =>{ 
        //   return it.category === this.categories.title
        // })  
      })
    ) 

    
  }

  

  ionViewDidEnter(){
    this.ngOnInit();
    //this.openDetailModal(produit: Produit);
  }

  back(){
    this.router.navigate(['/tab/accueil'])
  }

  
  async openDetailModal(produit: Produit){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps:{produit},
    });
    await modal.present();
    const {data: updatedProduit,role} = await modal.onDidDismiss();
    if(updatedProduit && role === 'edit'){
      this.produits$ = this.produits$.pipe(
        map((produits) => {
          produits.forEach((prod) => {
            if(prod.id === updatedProduit.id){
              prod = updatedProduit;
            }
            return prod;
          });
          return produits;
        })
      )
    }
    if(role === 'delete'){
      this.produits$ = this.produits$.pipe(
        map((produits)  => {
          produits.filter((prod) => prod.id != updatedProduit.id);
          return produits;
        })
      );
    }
  } 

  logout(){
    this.userOut = this.authService.signOut(this.userData).subscribe((response : any) =>{
      console.log(response);
      this.router.navigate(['connexion'])
    })
  }
}

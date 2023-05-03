import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  categories:any;
  produits:any;

  constructor(
    private router: Router,
    private categorieService: CategoriesService,
    private produitService : ProduitService
  ) { }

  ngOnInit() {
    this.getListOfCategorie();
  }

  getListOfCategorie(){
    this.categorieService.getCategories().subscribe((response : any) =>{
      this.categories = response;
      console.log(this.categories);
    })
  }

  getListOfProduit(){
    this.produitService.getProduit().subscribe((response : any) => {
      this.produits = response;
    })
  }

  getProduit(cat: any){
    localStorage.setItem("cat", JSON.stringify(cat));
    this.router.navigate(['/tab/home']);
  }

  // categorie(c){
  //   localStorage.setItem("liv", JSON.stringify(c));
  //   this.router.navigate(['/livre']);
  // }

}

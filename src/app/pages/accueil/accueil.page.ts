import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHelper } from 'src/app/helpers/user';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  userData:any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categorieService: CategoriesService,
    private produitService : ProduitService
  ) { }

  ngOnInit() {
    this.getListOfCategorie();

    this.userData = UserHelper.getUser()?.user;

    //console.log(this.userData.id)
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

  logout() {
    this.authService.logout().toPromise().then((data:any)=>{ 
      localStorage.removeItem(UserHelper.getUser().token)
      console.log(data);
      this.router.navigate(['/connexion']);
    })

    // UserHelper.deleteItem()
    // this.router.navigate(['/login']);
  }
  // categorie(c){
  //   localStorage.setItem("liv", JSON.stringify(c));
  //   this.router.navigate(['/livre']);
  // }

}

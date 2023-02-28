import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { Produit } from 'src/app/home/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { UserHelper } from 'src/app/helpers/user';
// import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker';


@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.page.html',
  styleUrls: ['./ajouter-produit.page.scss'],
})
export class AjouterProduitPage implements OnInit {

  userData:any;

  @Input() produit!: Produit;
  public form! : FormGroup;
  isEditMode = false;
  croppedImagepath = "";
  isLoading = false;
  categorie:any;
  photo = [];
  localUser:any

  constructor(
    private produitService:ProduitService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private modalCtrl:ModalController,
    public actionSheetController: ActionSheetController,
    private categorieService: CategoriesService
    // private imagePicker: ImagePicker,
    
  ) { }
  ngOnInit() {

    this.userData = UserHelper.getUser()?.user;
    

    this.initAddproductForm();
    if(this.produit){
      this.isEditMode = true;
      this.setFormValues();
    }

    this.getListOfCategorie();

    
  }

  initAddproductForm(){
    this.form = new FormGroup({
      title: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required]),
      photo: new FormControl(null,[Validators.required]),
      stock: new FormControl(null,[Validators.required]),
      size: new FormControl(null,[Validators.required]),
      price: new FormControl(null,[Validators.required]),
      status: new FormControl(null,[Validators.required]),
      category: new FormControl(null,[Validators.required]),
      user_id: new FormControl(this.userData.id),
    });
  }

  getListOfCategorie(){
    this.categorieService.getCategories().subscribe((response : any) =>{
      this.categorie = response;
      console.log(this.categorie);
    } )
  }

  setFormValues(){
    this.form.setValue({
      title: this.produit.title,
      description: this.produit.description,
      photo: this.produit.photo,
      stock: this.produit.stock,
      size: this.produit.size,
      price: this.produit.price,
      status: this.produit.status,
      category: this.produit.category,
      user_id: this.userData.id, 
    })
  }   

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  async add(){
    const loading = await this.loadingCtrl.create({message:'Loading...'});
    loading.present();
    let response;
    if(this.isEditMode){
      response = this.produitService.updateProduit(
        this.produit.id,
        this.form.value
      );
    }
    else{
      response = this.produitService.addProduit(
        this.form.value,
      );
      console.log(this.userData.id)
    }
    response.pipe(take(1)).subscribe((produit:any) => {
      console.log(produit);
      this.form.reset();
      loading.dismiss();
      if(this.isEditMode){
        this.closeModal(produit);
        //.....
      }
    });  
    this.router.navigate(['/tab/home']);
  }

  

}

  


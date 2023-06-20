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
  file:any;
  categories:any;

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

    let prod = localStorage.getItem("cat");
    this.categories = JSON.parse(prod!);
    
    this.userData = UserHelper.getUser()?.user;
    

    this.initAddproductForm();
    if(this.produit){
      this.isEditMode = true;
      this.setFormValues();
    }

    //this.getListOfCategorie();

    console.log(this.categories.title)
    console.log(this.categories.id)

    
    
  }

  initAddproductForm(){
    this.form = new FormGroup({
      type: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required]),
      photo: new FormControl(null,[Validators.required]),
      // stock: new FormControl(null,[Validators.required]),
      // size: new FormControl(null,[Validators.required]),
      price: new FormControl(null,[Validators.required]),
      status: new FormControl(null,[Validators.required]),
      category: new FormControl(this.categories.title),
      user_id: new FormControl(this.userData.id),
    });
  }

  // getListOfCategorie(){
  //   this.categorieService.getCategories().subscribe((response : any) =>{
  //     this.categorie = response;
  //     console.log(this.categorie);
  //   } )
  // }

  setFormValues(){
    this.form.setValue({
      type: this.produit.type,
      description: this.produit.description,
      photo: this.produit.photo,
      // stock: this.produit.stock,
      // size: this.produit.size,
      price: this.produit.price,
      status: this.produit.status,
      category: this.categories.title,
      user_id: this.userData.id, 
      cat_id: this.categorie.id,
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
      const f = new FormData()
      f.append("photo", this.file)
      f.append("type", this.form.value.type)
      f.append("description", this.form.value.description)
      // f.append("stock", this.form.value.stock)
      // f.append("size", this.form.value.size)
      f.append("price", this.form.value.price)
      f.append("status", this.form.value.status)
      f.append("category", this.form.value.category)
      f.append("user_id", this.form.value.user_id)
      response = this.produitService.addProduit(
        f,
        this.categories.id
      );
      //console.log(this.userData.id)
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

  uploadFile(event: Event){
    this.file = (event.target as HTMLInputElement)?.files?.[0];
    
  }

}

  


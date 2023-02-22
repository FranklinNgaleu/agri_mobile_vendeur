import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { Produit } from 'src/app/home/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
// import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker';


@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.page.html',
  styleUrls: ['./ajouter-produit.page.scss'],
})
export class AjouterProduitPage implements OnInit {

  @Input() produit!: Produit;
  public form! : FormGroup;
  isEditMode = false;
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  
  photo = [];

  constructor(
    private produitService:ProduitService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private modalCtrl:ModalController,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File
    // private imagePicker: ImagePicker,
    
  ) { }
  ngOnInit() {
    this.initAddproductForm();

    if(this.produit){
      this.isEditMode = true;
      this.setFormValues();
    }

    
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
      //categorie: new FormControl(null,[Validators.required]),
     
    });
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
      response = this.produitService.addProduit(this.form.value);
    }
    response.pipe(take(1)).subscribe((produit:any) => {
      this.form.reset();
      loading.dismiss();
      if(this.isEditMode){
        this.closeModal(produit);
        //.....
      }
    });  
    //this.router.navigate(['/tab/home']);
  }

  pickImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
}
  

  


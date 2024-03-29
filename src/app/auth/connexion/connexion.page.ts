import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserHelper } from 'src/app/helpers/user';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage{
  
  //mes we
  userData: any; 
  message:any;

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  public formData!: FormGroup;
  users: any = {};
  userss:any = {};
  private myToast:any;

  constructor(
    public fb: FormBuilder,
    private toast: ToastController,

    //mes we
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    // this.infoForm();
    
  }

  // getUser(){
  //   if(localStorage.getItem('users') === null){
  //     this.userss = [];
  //   }else{
  //     this.userss = JSON.parse(localStorage.getItem('users'));
  //   }
  // }

  // infoForm(){
  //   this.authService.formData = this.fb.group({ 
  //     email: ['',Validators.required],
  //     password: ['',Validators.required],
  //     // role: ['',Validators.required],
  //   });
  // }

  // login(){
  //   this.router.navigate(['/tab/accueil']);
  // }

  // showToast(msg: string){
  //   this.myToast = this.toast.create({
  //     message:msg,
  //     duration: 2000
  //   }).then((toastData) => {
  //     console.log(toastData);
  //     toastData.present();
  //   });
  // }

  // HideToast(){
  //   this.myToast = this.toast.dismiss();
  // }

  // logOut(){
  //   localStorage.removeItem("email");
  // }


  // ma fonction de login
  
  
  login() {
    let login={
      email : this.loginForm.value.email,
      password : this.loginForm.value.password,
    };
    console.log(login);
    this.authService.login(login).toPromise().then((data:any)=>{
      console.log(login);
      UserHelper.connect(data);
      this.userData = UserHelper.getUser()?.user;
      if(this.userData.email == this.loginForm.value.email && this.userData.status == 'active'){
        this.redirectByRole();
      }else{
        console.log("ndem");
      }
    },
    (res) => {
     
    })
    // Enabling Side Menu
    
  }

  redirectByRole(){
    if(this. userData.role == 'vendeur'){
      console.log(UserHelper.getUser());
    this.navCtrl.navigateRoot('/tab/accueil', { animationDirection: 'forward' });
    };
  }
  

}

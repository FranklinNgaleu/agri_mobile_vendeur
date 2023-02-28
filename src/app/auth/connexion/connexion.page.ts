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
  //   const val = this.authService.formData.value;
  //   this.authService.login(val.email, val.password).subscribe(res =>{
  //     this.users = res;
  //     console.log(this.users.user);
  //     let jwt = "bearer" + this.users.jwt;
  //     localStorage.setItem("token",jwt)
  //     localStorage.setItem("user",JSON.stringify(this.users.user))
  //     this.authService.islogin = true;
  //     if(this.users.user.role == "vendeur" && this.users.user.status == "active" ){
  //       // this.authService.vendeur = true;
  //       this.router.navigate(['/tab/home']);
  //     }
  //     // else {
  //     //   this.authService.admin = true;
  //     //   this.router.navigate(['/tab/about']);
  //     // }
  //   });
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
      if(this.userData.email == this.loginForm.value.email){
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
    this.navCtrl.navigateRoot('/tab/home', { animationDirection: 'forward' });
    };
  }
  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserHelper } from 'src/app/helpers/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['../connexion/connexion.page.scss'],
})
export class InscriptionPage implements OnInit {

  display: boolean = false;
  userData: any;
  message:any;
  showDialog() {
    this.display = true;
  }
  submitting = false;
  loading=false;
  registerForm = this.formBuilder.group({
    name: new FormControl('', [ Validators.required]),
    email: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
    role: new FormControl(''),
  });

  //private myToast:any;
  constructor(
    // public fb: FormBuilder,
    // public authService: AuthService,
    // public router: Router,
    // private toast: ToastController,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    //this.infoForm();
  }

  // infoForm(){
  //   this.authService.formData = this.fb.group({
  //     name: ['',Validators.required],
  //     email: ['',Validators.required],
  //     contact: ['',Validators.required],
  //     password: ['',Validators.required],
  //     pass: ['',Validators.required],
  //     role: ['vendeur'],
  //   });
  // }

  // onSubmit(){
  //   const val = this.authService.formData.value;
  //   if(val.password == val.pass){
  //     const val = this.authService.formData.value;
  //     this.authService.registerUser(val).subscribe(data =>{
  //       this.showToast('Succes validation...');
  //       this.router.navigate(['/connexion']);
  //     });
  //   }
  //   else{
  //     this.showToast('Verifiez votre mot de passe...');
  //   }
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

  register(){
    this.submitting = true;
    this.display=false;
    // this.userData = UserHelper.getUser()?.user;
    let register={
      name : this.registerForm.value.name,
      email : this.registerForm.value.email,
      contact : ""+this.registerForm.value.contact,
      password : this.registerForm.value.password,
      pass : this.registerForm.value.pass,
      role : "vendeur",
    };
    this.submitting = true;
    console.log(register);
    this.authService.register(register).toPromise().then((data: any) => {
      this.submitting = false;
      console.log(register);
      UserHelper.connect(data);
      this.userData = UserHelper.getUser()?.user;
      if(this.userData.email == this.registerForm.value.email){
        this.router.navigate(['connexion']);
      }else{
        this.display = true;  
      }
    },
    (res) => {
      this.submitting = false;
    });

  }

  // redirectByRole(){
  //   if(this. userData.role == 'vendeur'){
  //     console.log(UserHelper.getUser());
  //     this.router.navigate(['connexion']);
  //   };
  // }


  

}



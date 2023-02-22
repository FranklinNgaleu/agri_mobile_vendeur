import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { AuthService } from 'src/app/services/auth.service';
// import { Login } from './login.model';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage{

    // password:any;
    
    // isSubmitted = false;
    // user: any={};
    // userActu: any={};
    //loginname : String;
    
    // errorMessage:string;  
    // name : string;  

    // id:any;
    // login = new Login
    // target: any = ''
    // token: any;
    // tokenval:any = '';
  

  constructor(
    // private loginApi : AuthService,
    // private spinner: NgxSpinnerService,
    // private route: Router
  ) { }

  ngOnInit() {
  }

  // loginUser() {
  //   this.spinner.show();
  //   if (this.login.email == undefined || this.login.password == undefined) {
  //     this.target = '<div class="alert alert-danger" > Error! Please enter the details</div>';
  //     setTimeout(() => {
  //       this.spinner.hide();
  //     }, 1000);
  //     return;
  //   }
  //   this.loginApi.loginUser(this.login).subscribe((response: any) => {
  //     setTimeout(() => {
  //       this.spinner.hide();
  //     }, 1000);
  //       this.login.email = '';
  //       this.login.password = '';
  //       console.log(response);
  //       if (response.code == 1) {
  //           this.token = localStorage.setItem('token', response.token);
  //           console.log("set token to storage", localStorage.getItem('token'));
  //           this.target = '<div class="alert alert-success" > Success! ' + response.message + '</div>';
  //           this.route.navigate(['tab/home']);
  //       }
  //     else if (response.code == 2) {
  //       this.target = '<div class="alert alert-danger" > Error! ' + response.message + '</div>';
  //     }
  //   });
  // }

}

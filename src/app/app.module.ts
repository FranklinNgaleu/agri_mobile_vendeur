import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {TokenInterceptor} from "../app/auth/connexion/tokenInterceptor.service"

import {IonicModule, IonicRouteStrategy } from '@ionic/angular';

// mport { AnimationBuilder } from '@angular/animations';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

import {TokenInterceptor} from "./services/auth/tokenInterceptor";
import {ErrorInterceptor} from "./services/auth/errorInterceptor";
import { AuthService } from './services/auth/auth.service';






@NgModule({
  declarations: [AppComponent,DetailComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    Camera,
    AuthService,
    File,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
      HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
  
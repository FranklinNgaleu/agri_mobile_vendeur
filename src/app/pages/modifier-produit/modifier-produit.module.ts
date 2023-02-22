import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierProduitPageRoutingModule } from './modifier-produit-routing.module';

import { ModifierProduitPage } from './modifier-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierProduitPageRoutingModule
  ],
  declarations: [ModifierProduitPage]
})
export class ModifierProduitPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierProduitPage } from './modifier-produit.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierProduitPageRoutingModule {}

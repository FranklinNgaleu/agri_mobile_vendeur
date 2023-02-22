import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: '',
        children: [
          {
            path: 'ajouter-produit',
            loadChildren: () => import('src/app/pages/ajouter-produit/ajouter-produit.module').then( m => m.AjouterProduitPageModule)
          },
          {
            path: 'home',
            loadChildren: () => import('src/app/home/home.module').then( m => m.HomePageModule)
          },
          {
            path: 'history',
            loadChildren: () => import('src/app/pages/history/history.module').then( m => m.HistoryPageModule)
          },
          {
            path: 'about',
            loadChildren: () => import('src/app/pages/about/about.module').then( m => m.AboutPageModule)
          },
          {
            path: 'modifier-produit',
            loadChildren: () => import('src/app/pages/modifier-produit/modifier-produit.module').then( m => m.ModifierProduitPageModule)
          },
          {
            path: '',
            redirectTo: '/tab/home',
            pathMatch: 'full',
          },
       
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}

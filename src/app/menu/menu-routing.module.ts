import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
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
            path: '',
            redirectTo: '/menu/home',
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
export class MenuPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LojasFavoritasPage } from './lojas-favoritas.page';

const routes: Routes = [
  {
    path: '',
    component: LojasFavoritasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LojasFavoritasPageRoutingModule {}

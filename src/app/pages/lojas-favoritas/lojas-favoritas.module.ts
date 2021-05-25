import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LojasFavoritasPageRoutingModule } from './lojas-favoritas-routing.module';

import { LojasFavoritasPage } from './lojas-favoritas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LojasFavoritasPageRoutingModule
  ],
  declarations: [LojasFavoritasPage]
})
export class LojasFavoritasPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FruitsVegetablesPage } from './fruits-vegetables';

@NgModule({
  declarations: [
    FruitsVegetablesPage,
  ],
  imports: [
    IonicPageModule.forChild(FruitsVegetablesPage),
  ],
})
export class FruitsVegetablesPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllProductPage } from './all-product';

@NgModule({
  declarations: [
    AllProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AllProductPage),
  ],
})
export class AllProductPageModule {}

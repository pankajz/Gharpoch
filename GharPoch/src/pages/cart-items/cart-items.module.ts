import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartItemsPage } from './cart-items';

@NgModule({
  declarations: [
    CartItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(CartItemsPage),
  ],
})
export class CartItemsPageModule {}

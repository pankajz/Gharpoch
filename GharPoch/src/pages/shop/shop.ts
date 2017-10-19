import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { AllProductPage } from '../all-product/all-product'

/**
 * Generated class for the ShopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  cartCount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ngOnInit(): void {
    if(!this.cartCount){
      sessionStorage.setItem('cartCount','0');
      this.cartCount = parseInt(sessionStorage.getItem('cartCount'));
    }else{
      this.cartCount = parseInt(sessionStorage.getItem('cartCount'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

 categories(id,cat){
  	this.navCtrl.push(AllProductPage,{selected_id : id,selected_cat : cat});
  }




}

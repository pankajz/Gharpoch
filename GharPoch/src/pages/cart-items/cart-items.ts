import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CartItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-items',
  templateUrl: 'cart-items.html',
})
export class CartItemsPage {
  data1:any;
  jsonData:any;
  cartCount : any;
  total :any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public stor :StorageProvider, public alertCtrl: AlertController) {
    //console.log(sessionStorage.getItem("products"));
    this.getCartItem();
  }

  getCartItem(){
    this.data1=sessionStorage.getItem("products");
    this.data1 = JSON.parse(this.data1);
      let result1=[];
      for(var i=0;i<this.data1.length;i++){
        if(this.data1[i].quantity>0){
          result1.push(this.data1[i]);
        }
      }
      this.jsonData=result1;
    console.log("added items = "+JSON.stringify(this.jsonData));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartItemsPage');
  }
  ionViewWillEnter() {
    this.cartCounting();
  }

  cartCounting(){
    var allprod = this.stor.storeProduct('');
    var countprod = 0;
    var tot = 0;
    if(allprod){
      for(var i=0; i<allprod.length;i++){
        if(allprod[i].quantity>0){
          countprod++;
          tot += (allprod[i].offer_price*allprod[i].quantity);
        }
      }
    }
    console.log(countprod);
    this.cartCount = countprod;
    this.total = tot;
  }
  order(){
    if(this.cartCount!=0){
      this.navCtrl.push(CartPage);
    }else{
      let alert = this.alertCtrl.create({
                title: 'Please add product to cart.',
                buttons: ['OK']
              });
              alert.present();
    }
    
  }

  remove(item){
      item.quantity=0;
      //this.cartCount -=1;
      this.stor.storeProduct(this.data1);
      this.cartCounting();
      this.getCartItem();
  }
}

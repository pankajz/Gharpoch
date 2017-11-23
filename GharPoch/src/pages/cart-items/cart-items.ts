import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login';
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
  subtot :any = 0;
  disctot :any=0;
  expressTime:any;
  is_login:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public stor :StorageProvider, public alertCtrl: AlertController) {
    //console.log(sessionStorage.getItem("products"));
    if(localStorage.getItem("isLogin")){
      this.is_login = localStorage.getItem("isLogin");
    }else{
      this.is_login = 'false';
    }
    
    if(sessionStorage.getItem('expressTime')){
      this.expressTime = sessionStorage.getItem('expressTime');
    }else{
      this.expressTime = '8:30AM TO 10:30AM';
    }
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
    var stot =0;
    var dtot =0;
    if(allprod){
      for(var i=0; i<allprod.length;i++){
        if(allprod[i].quantity>0){
          
          countprod++;
          if(allprod[i].offer_price){
            tot += (allprod[i].offer_price*allprod[i].quantity);
          }else{
            tot += (allprod[i].sell_price*allprod[i].quantity);
          }
          //tot += (allprod[i].offer_price*allprod[i].quantity);
          stot += (allprod[i].sell_price*allprod[i].quantity);
          dtot = stot - tot;
        }
      }
    }
    console.log(countprod);
    this.cartCount = countprod;
    this.total = tot;
    this.subtot = stot;
    this.disctot = dtot;
  }
  order(){
    if(this.cartCount!=0){
      var loginstatus = localStorage.getItem("isLogin");
      if(loginstatus=='true'){
        sessionStorage.setItem("cartAdded",'true');
        this.navCtrl.push(CartPage);
      }else{
        sessionStorage.setItem("cartAdded",'true');
        this.navCtrl.push(LoginPage);
      }
      
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

   addToCart(item){
    item.quantity+=1;
    //this.cartCount +=1;
    this.stor.storeProduct(this.data1);
    this.cartCounting();
    //sessionStorage.setItem('cartCount',this.cartCount);
    //console.log(JSON.stringify(item));
    //this.cartlist.push({"product_id":item.id,"qty":item.quantity});
  }

  removeFromCart(item){
    if(item.quantity>0){
      item.quantity-=1;
      //this.cartCount -=1;
      this.stor.storeProduct(this.data1);
      this.cartCounting();
      //sessionStorage.setItem('cartCount',this.cartCount);
      //console.log(JSON.stringify(item));
    }else{
      console.log("No item selected");
    }
  }
}

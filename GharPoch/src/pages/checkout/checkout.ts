import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopPage } from '../shop/shop';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  orderid:any;
  delivery_time:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var parpass = this.navParams.get('resp');
    console.log(parpass);
    this.orderid = parpass.order.id;
    this.delivery_time = parpass.order.delivery_time;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  gotoShop(){
    this.navCtrl.setRoot(ShopPage);
  }

}

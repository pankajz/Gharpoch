import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  public unregisterBackButtonAction: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {
    var parpass = this.navParams.get('resp');
    console.log(parpass);
    this.orderid = parpass.order.id;
    this.delivery_time = parpass.order.delivery_time;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    public initializeBackButtonCustomHandler(): void {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.customHandleBackButton();
        }, 10);
    }

    private customHandleBackButton(): void {
        // do what you need to do here ...
    }

  gotoShop(){
    this.navCtrl.setRoot(ShopPage);
  }

}

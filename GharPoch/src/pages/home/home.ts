import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cartCount:any;
  constructor(public navCtrl: NavController) {
    
    if(!this.cartCount){
      sessionStorage.setItem('cartCount','0');
      this.cartCount = parseInt(sessionStorage.getItem('cartCount'));
    }else{
      this.cartCount = parseInt(sessionStorage.getItem('cartCount'));
    }
    
  }

    shop(){
	  	this.navCtrl.push(ShopPage);
	}
	signup(){
		this.navCtrl.push(SignupPage);
	}

}

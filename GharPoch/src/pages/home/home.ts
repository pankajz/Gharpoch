import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cartCount:any;
  constructor(public navCtrl: NavController) {
    var loginstatus = localStorage.getItem("isLogin")
    if(loginstatus=='true'){
      this.navCtrl.setRoot(ShopPage);
    }
    
  }

  signin(){
    this.navCtrl.push(LoginPage);
  }

  shop(){
	  	this.navCtrl.push(ShopPage);
	}
	signup(){
		this.navCtrl.push(SignupPage);
	}

}

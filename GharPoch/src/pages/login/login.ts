import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ShopPage } from '../shop/shop';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public data: any;
  public email:any;
  public pass:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl: AlertController, public storageProvider:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotoHome(){
    this.navCtrl.setRoot(HomePage);
  }

  gotoSignUp(){
    this.navCtrl.push(SignupPage);
  }

  login_fun(){
    if(this.email==null){
      alert("Please enter email");
      }else if(this.pass==null){
      alert("Please enter password");
      }
      else{
      let json_data={"email":this.email,"password":this.pass};
      return new Promise(resolve => {

      this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/login',json_data)
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          this.data = data;
          console.log(this.data.response.flag)
          if(this.data.response.flag==true){
            var userdetails = this.data.response.user;
            console.log(this.data.response.user);
            this.storageProvider.userData(userdetails);
            this.navCtrl.setRoot(ShopPage);
          }else{
            let alert = this.alertCtrl.create({
              title: 'Invalid Email or Password',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        });
      });
    }

  }

}

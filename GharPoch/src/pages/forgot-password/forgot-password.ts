import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  isOtp:any;
  pass:any;
  email:any;
  confpass:any;
  receivedOTP:any;
  data:any;
  accesstoken:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl: AlertController) {
    this.isOtp = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  gotoLogin(){
    this.navCtrl.pop();
  }

  sendOtp(){
    if(this.email==null){
      alert("Please enter email");
    }
    else{
      let json_data={"email":this.email};
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return new Promise(resolve => {

      this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/forget-password',json_data,{headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          this.data = data;
          console.log(this.data)
          if(this.data.response.flag==true){
            let otpalert = this.alertCtrl.create({
              title: 'OTP',
              message: "Enter a OTP which send to your email.",
              inputs: [
                {
                  name: 'OTP',
                  placeholder: 'OTP'
                },
              ],
              buttons: [
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Verify',
                  handler: data => {
                    console.log(data.OTP)
                    this.checkotp(data.OTP);
                  }
                }
              ]
            });
            otpalert.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Invalid Email',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        });
      });
    }
  }

checkotp(par){

      let json_data={"token":par};
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return new Promise(resolve => {

      this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/verify-token',json_data,{headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          this.data = data;
          console.log(this.data)
          if(this.data.response.flag==true){
            this.isOtp = true;
            this.accesstoken = this.data.response.user.access_token;
          }else{
            let alert = this.alertCtrl.create({
              title: 'OTP not matched.',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        });
      });
}

  changepass(){
    if(this.pass == this.confpass){
      let json_data={"password":this.pass};
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('access_token', this.accesstoken);
      return new Promise(resolve => {

      this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/reset-password',json_data,{headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          
          this.data = data;
          console.log(this.data)
          if(this.data.response.flag==true){
            let alert = this.alertCtrl.create({
              title: 'You have successfully set a new password.',
              buttons: [{
                  text: 'OK',
                  handler: data => {
                     this.navCtrl.pop();
                  }
                }]
            });
           alert.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Access Token missing or Invalid.',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        });
      });
    }else{
      let alert = this.alertCtrl.create({
              title: 'Password and confirm password are not matched.',
              buttons: ['Dismiss']
            });
            alert.present();
    }
    
  }

}

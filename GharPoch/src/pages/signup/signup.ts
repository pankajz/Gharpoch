import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import {LoginPage} from '../login/login';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public fname: any;
  public lname: any;
  public email: any;
  public pass: any;
  public address: any;
  public data:any;
  public mobile:any;
  public city:any;
  public zip:any;
  public state:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp(){
     let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
    if(this.validation()){
      let json_data={"first_name":this.fname,"last_name":this.lname,"email":this.email,"password":this.pass,"location":this.address,"mobile":this.mobile,"city":this.city,"zip":this.zip,"state":this.state};
      return new Promise(resolve => {

        this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/create',json_data)
        .map(res => res.json())
        .subscribe(data => {
        //debugger;
          this.data = data;
          console.log(data);
          if(this.data.response){
           // alert(this.data.response.error)
            let alert = this.alertCtrl.create({
              title: 'Failed',
              subTitle: this.data.response.error,
              buttons: ['Dismiss']
            });
            alert.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Registration successfull please login',
              buttons: ['OK']
            });
            alert.present();
            alert.onDidDismiss(() =>{ 
              loading.dismiss();
              this.navCtrl.setRoot(LoginPage);  
            });
            
          }
          loading.dismiss();
        });
      });
    }else{
      loading.dismiss();
    }

  }
  validation(){
    var errmsg='';
    var count = 0;
    if(this.fname==null){
      errmsg = "please enter first name";
      count++;
    }
    else if(this.lname==null){
      errmsg ="Please enter last name";
      count++;
    }
    else if(this.email==null){
      errmsg = "Please enter email id";
      count++;
    }
    else if(this.pass==null){
      errmsg = "Please enter password";
      count++;
    }
    else if(this.address==null){
      errmsg ="Please enter address";
      count++;
    }
    else if(this.mobile==null){
      errmsg ="Please enter mobile";
      count++;
    }
    else if(this.city==null){
      errmsg ="Please enter city";
      count++;
    }
    else if(this.zip==null){
      errmsg ="Please enter zip";
      count++;
    }
    // else if(this.state==null){
    //   errmsg ="Please enter state";
    //   count++;
    // }
    

    if(count == 0){
      return true;
    }
    else{
      let alert = this.alertCtrl.create({
          title: 'Fill Credentials',
          subTitle: 'All fields are required.',
          buttons: ['Dismiss']
        });
        alert.present();
        return false;
    }
  }

}

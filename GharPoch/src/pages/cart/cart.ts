import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import {AllProductPage} from '../../pages/all-product/all-product';
import { ShopPage } from '../shop/shop';
import { AlertController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
name:any;
time:any;
jsonData = null;
access_token:any;
data:any;
result:any;
city:any;
state:any;
address:any;
zip:any;
number:any;
data1:any;
email:any;
userid:any;
  constructor(public alertCtrl: AlertController,public http:Http,public navCtrl: NavController, public navParams: NavParams, public storageProvider:StorageProvider) {
    this.data1=sessionStorage.getItem("products");
      this.data1 = JSON.parse(this.data1);
      var userdetails = localStorage.getItem("userdata");
      var userdetails1 = JSON.parse(userdetails);
      var userpro = userdetails1.user_details;
      console.log(userdetails);
      this.name = userdetails1.first_name+userdetails1.last_name;
      this.address = userdetails1.location;
      this.email = userdetails1.email;
      this.number = userpro.contact;
      this.city = userdetails1.city;
      this.zip = userpro.zip;
      this.userid = userdetails1.id;
      let result1=[];
      this.city='Sangli';
      //this.time = '8:30AM TO 10:30AM';
      if(sessionStorage.getItem('expressTime')){
        this.time = sessionStorage.getItem('expressTime');
      }else{
        this.time = '8:30AM TO 10:30AM';
      }
      for(var i=0;i<this.data1.length;i++){
        if(this.data1[i].quantity>0){
          result1.push(this.data1[i]);
        }
      }
      this.jsonData=result1;
    
    result1=[];
    for(var i=0;i<this.jsonData.length;i++){
      result1.push({"product_id":this.jsonData[i].id,"qty":this.jsonData[i].quantity})
    }
    this.jsonData=null;
    this.jsonData=result1;
    console.log("added items = "+JSON.stringify(this.jsonData));

    this.access_token=localStorage.getItem('accessToken');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

order(){
  let result1=[];
  result1.push({"user_id":this.userid, "delivery_time":this.time, "email":this.email, "contact":this.number, "orders":this.jsonData, "location":{"address":this.address,"city":this.city,"state":this.state,"zip":this.zip}
  });
  this.result=result1
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('access_token', this.access_token);
    this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/create-order',{
      "user_id":this.userid,
      "name":this.name,
      "email":this.email,
      "delivery_time":this.time,
      "orders":this.jsonData,
      "location":{"address":this.address,"city":this.city,"state":this.state,"zip":this.zip},
      "contact":this.number
    },{headers:headers})
          .map(res => res.json())
          .subscribe(data => {
            //debugger;
            
            
            if(data.response.flag==true)
            {
              console.log(data.response);
              this.navCtrl.push(CheckoutPage,{resp:data.response});
             
             // this.navCtrl.setRoot(ShopPage);
            }else{
              let alert = this.alertCtrl.create({
                title: 'Failed',
                subTitle: 'Please try again.',
                buttons: ['OK']
              });
              alert.present();
            }
          });
          console.log(this.result);
  }

}

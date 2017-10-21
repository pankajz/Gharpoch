import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import {AllProductPage} from '../../pages/all-product/all-product';
import { ShopPage } from '../shop/shop';
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
jsonData = null;
access_token:any;
data:any;
result:any;
city:any;
state:any;
address:any;
zip:any;
number:any;
  constructor(public http:Http,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get("jsonData"));
    this.jsonData=this.navParams.get("jsonData");
//         this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/login',{
// 	"email":"abc@gmail.com",
// 	"password":"123"
// })
//           .map(res => res.json())
//           .subscribe(data => {
//             //debugger;
//             //this.data=JSON.parse(data)
//             console.log(data.response.user.access_token);
//             this.access_token=data.response.user.access_token;
//           });
this.access_token='$2y$10$hbLEZ.7lb9Ln5rhWN1hac.gucQbx5f26V2bEQzKONPwNNmNKGijQS';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

order(){
  let result1=[];
  result1.push({"user_id":"4", "orders":this.jsonData, "location":{"address":this.address,"city":this.city,"state":this.state,"zip":this.zip},
    "contact":this.number
  });
  this.result=result1
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('access_token', this.access_token);
    this.http.post('http://gharphoch.com.cs-mum-9.webhostbox.net/api/create-order',{
 "user_id":"4",
 "orders":this.jsonData,
 "location":{"address":this.address,"city":this.city,"state":this.state,"zip":this.zip},
 "contact":this.number
})
          .map(res => res.json())
          .subscribe(data => {
            //debugger;
            console.log(data.response.flag);
            if(data.response.flag==true)
            {
              alert("Order placed successfully");
              this.navCtrl.setRoot(ShopPage);
            }
          });
          console.log(this.result);
}

}

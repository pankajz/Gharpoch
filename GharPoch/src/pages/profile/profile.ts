import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profres : any;
  userdata:any;
  userdetails : any;
  firstname:any;
  lastname:any;
  address:any;
  city:any;
  number:any;
  email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public webService: WebServiceProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUserProfile();
  }

   getUserProfile(){
      var udata=localStorage.getItem("userdata");
      udata = JSON.parse(udata);
      console.log(udata)
      //debugger;
      this.webService.getUserProfile()
      .then(data => {
        this.userdata = data;
        this.userdetails = this.userdata.response.user;
        console.log(this.userdetails);
        this.firstname=this.userdetails.first_name;
        this.lastname=this.userdetails.last_name;
        this.email=this.userdetails.email;
        this.number=this.userdetails.contact;
        this.address=this.userdetails.location;
        this.city=this.userdetails.user_details.city;
      });
      

    }
    logout(){
      this.storage.logout();
      this.navCtrl.setRoot(HomePage);
    }

}

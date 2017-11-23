import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WebServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebServiceProvider {
  data:any;
  constructor(public http: Http) {
    console.log('Hello WebServiceProvider Provider');
  }

  getAllProduct(){
    return new Promise(resolve => {

      this.http.get('http://gharphoch.com.cs-mum-9.webhostbox.net/api/products')
          .map(res => res.json())
          .subscribe(data => {
            //debugger;
            this.data = data;
            console.log(data);
            resolve(this.data);
          });
      });
    }

    getUserProfile(){
      
      return new Promise(resolve => {
        let access_token=localStorage.getItem('accessToken');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('access_token', access_token);
      this.http.get('http://gharphoch.com.cs-mum-9.webhostbox.net/api/profileDetails',{headers:headers})
          .map(res => res.json())
          .subscribe(data => {
            //debugger;
            this.data = data;
            console.log(data);
            resolve(this.data);
          });
      });
    }
  

}

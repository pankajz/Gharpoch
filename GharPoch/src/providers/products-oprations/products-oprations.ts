import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductsOprationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsOprationsProvider {
  data:any;
  constructor(public http: Http) {
    //console.log('Hello ProductsOprationsProvider Provider');
  }

  getAllProduct(){
    return new Promise(resolve => {

      this.http.get('http://gharphoch.com.cs-mum-9.webhostbox.net/api/products')
          .map(res => res.json())
          .subscribe(data => {
            //debugger;
            this.data = data;
            //console.log(data);
            resolve(this.data);
          });
      });
    }

}

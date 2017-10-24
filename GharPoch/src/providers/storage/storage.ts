import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: Http) {
    console.log('Hello StorageProvider Provider');
  }

  storeProduct(data){
    if(data){
      data = JSON.stringify(data);
      sessionStorage.setItem('products',data);
    }else{
      data=sessionStorage.getItem("products");
      data = JSON.parse(data);
    }
    return data;
  }

}

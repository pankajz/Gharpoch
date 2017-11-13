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

  userData(data){
    if(data){
      localStorage.setItem('accessToken',data.access_token);
      data = JSON.stringify(data);
      localStorage.setItem('userdata',data);
      localStorage.setItem("isLogin",'true');
    }else{
      data=localStorage.getItem("userdata");
      data = JSON.parse(data);
    }
    return data;
  }

  userProf(data){
     if(data){
      localStorage.setItem('accessToken',data.access_token);
      data = JSON.stringify(data);
      localStorage.setItem('userdata',data);
    }else{
      data=localStorage.getItem("userdata");
      data = JSON.parse(data);
    }
    return data;
  }
   logout(){
     localStorage.clear();
     sessionStorage.clear();
     localStorage.setItem("isLogin",'false');

   }

}

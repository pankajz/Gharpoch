import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { AllProductPage } from '../all-product/all-product';
import { ProductsOprationsProvider } from '../../providers/products-oprations/products-oprations';
import { StorageProvider } from '../../providers/storage/storage';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { CartItemsPage } from '../../pages/cart-items/cart-items';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the ShopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  resp:any;
  items=[];
  cartlist=[];
  cartCount : any=0;
  total :any = 0;
  expressTime = '8:30AM TO 9:30PM';
  profres : any;
  islogin:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodOpr:ProductsOprationsProvider, public stor :StorageProvider, public webService :WebServiceProvider, public alertCtrl: AlertController) {
   var iscartadded = sessionStorage.getItem("cartAdded");
   if(iscartadded=='true'){

   }else{
      this.getAllProducts();
   }
    
  }

  ionViewWillEnter() {
    this.cartCounting();
     if(sessionStorage.getItem('expressTime')){
      this.expressTime = sessionStorage.getItem('expressTime');
    }else{
      this.expressTime = '8:30AM TO 9:30PM';
    }
  }
  
  ionViewDidLoad() {
    var loginstatus = localStorage.getItem("isLogin")
    if(loginstatus=='true'){
      this.getUserProfile();
      this.islogin = true;
    }else{
      this.islogin = false;
    }
  }

 categories(id,cat){
  	this.navCtrl.push(AllProductPage,{selected_id : id,selected_cat : cat});
  }

  getAllProducts() {
    this.prodOpr.getAllProduct()
    .then(data => {
        
        this.resp = data;
        var productsLst = this.resp.products;
        console.log(this.resp.products);
        
        for(var i=0;i<productsLst.length;i++){
          var cat_id = productsLst[i].category_id;
          //if(parseInt(cat_id)==parseInt(this.header_id)){
            console.log(productsLst[i].product_images[0]);
            if(productsLst[i].product_images[0]){
              console.log(productsLst[i].product_images[0].url);
              this.items.push({'cat_id':productsLst[i].category_id,'id':productsLst[i].id,'is_active':productsLst[i].is_active,'name':productsLst[i].name,'sell_price':productsLst[i].sell_price,'offer_price':productsLst[i].offer_price,'size':productsLst[i].size,'unit':productsLst[i].unit, 'sub_category_id':productsLst[i].sub_category_id, 'description':productsLst[i].description,'product_images1':'http://gharphoch.com.cs-mum-9.webhostbox.net'+productsLst[i].product_images[0].url,'quantity':0});
            }else{
              this.items.push({'cat_id':productsLst[i].category_id,'id':productsLst[i].id,'is_active':productsLst[i].is_active,'name':productsLst[i].name,'sell_price':productsLst[i].sell_price,'offer_price':productsLst[i].offer_price,'size':productsLst[i].size,'unit':productsLst[i].unit, 'sub_category_id':productsLst[i].sub_category_id, 'description':productsLst[i].description,'product_images1':'','quantity':0});
            }
            
          //}
          //console.log(this.items);
        }
        this.stor.storeProduct(this.items);
        this.cartCounting();
      });
  }

   getUserProfile(){
      
      this.webService.getUserProfile()
      .then(data => {
        this.profres = data;
        console.log(this.profres);
        var userdetails = this.profres.user;
        this.stor.userProf(userdetails);
      });

    }

  cartCounting(){
    var allprod = this.stor.storeProduct('');
    var countprod = 0;
    var tot = 0;
    if(allprod){
      for(var i=0; i<allprod.length;i++){
        if(allprod[i].quantity>0){
          countprod++;
          tot += (allprod[i].offer_price*allprod[i].quantity);
        }
      }
      console.log(countprod);
      this.cartCount = countprod;
      this.total = tot;
    }
    
  }

  gotToCart(){
    if(this.cartCount==0){
      let alert = this.alertCtrl.create({
              title: 'There are no items in basket.',
              buttons: ['OK']
            });
            alert.present();
    }else{
      this.navCtrl.push(CartItemsPage);
    }
  }
  gotoProfile(){
    this.navCtrl.push(ProfilePage);
  }
}

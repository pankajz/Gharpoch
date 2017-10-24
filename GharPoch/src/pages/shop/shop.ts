import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { AllProductPage } from '../all-product/all-product';
import { ProductsOprationsProvider } from '../../providers/products-oprations/products-oprations';
import { StorageProvider } from '../../providers/storage/storage';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodOpr:ProductsOprationsProvider, public stor :StorageProvider) {
    this.getAllProducts();
  }

  ionViewWillEnter() {
    this.cartCounting();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
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
            //console.log(productsLst[i]);
            this.items.push({'cat_id':productsLst[i].category_id,'id':productsLst[i].id,'is_active':productsLst[i].is_active,'name':productsLst[i].name,'sell_price':productsLst[i].sell_price,'offer_price':productsLst[i].offer_price,'size':productsLst[i].size,'unit':productsLst[i].unit,'description':productsLst[i].description,'product_images1':'http://gharphoch.com.cs-mum-9.webhostbox.net'+productsLst[i].product_images[0].url,'quantity':0});
          //}
          //console.log(this.items);
        }
        this.stor.storeProduct(this.items);
        this.cartCounting();
      });
  }

  cartCounting(){
    var allprod = this.stor.storeProduct('');
    var countprod = 0;
    if(allprod){
      for(var i=0; i<allprod.length;i++){
        if(allprod[i].quantity>0){
          countprod++;
        }
      }
      console.log(countprod);
      this.cartCount = countprod;
    }
    
  }


}

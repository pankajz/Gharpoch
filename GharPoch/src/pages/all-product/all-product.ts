import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsOprationsProvider } from '../../providers/products-oprations/products-oprations';
import { StorageProvider } from '../../providers/storage/storage';

import { CartItemsPage } from '../../pages/cart-items/cart-items';

/**
 * Generated class for the AllProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-product',
  templateUrl: 'all-product.html',
})
export class AllProductPage {
  header_name :any;
  header_id :any;
  resp:any;
  items=[];
  cartlist=[];
  cartCount : any;
  total :any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodOpr:ProductsOprationsProvider, public stor :StorageProvider) {
    this.header_id = navParams.get('selected_id');
    this.header_name = navParams.get('selected_cat');
    this.cartCount=0;
    this.cartCounting();
    
}

  ionViewDidLoad() {
    /*this.prodOpr.getAllProduct()
    .then(data => {
        
        this.resp = data;
        var productsLst = this.resp.products;
        console.log(this.resp.products);
        
        for(var i=0;i<productsLst.length;i++){
          var cat_id = productsLst[i].category_id;
          if(parseInt(cat_id)==parseInt(this.header_id)){
            console.log(productsLst[i]);
            this.items.push({'id':productsLst[i].id,'is_active':productsLst[i].is_active,'name':productsLst[i].name,'sell_price':productsLst[i].sell_price,'offer_price':productsLst[i].offer_price,'size':productsLst[i].size,'unit':productsLst[i].unit,'description':productsLst[i].description,'product_images1':'http://gharphoch.com.cs-mum-9.webhostbox.net'+productsLst[i].product_images[0].url,'quantity':0});
          }
          //this.items.push({"menuId":this.resp[i].menuId,"dishName":this.resp[i].dishName,"category":this.resp[i].category,"rates":this.resp[i].rates,"isActive":this.resp[i].isActive,"createdOn":this.resp[i].createdOn,"modifiedOn":this.resp[i].modifiedOn,"quantity":0});
          console.log(this.items);
        }
      });*/

      //this.items = this.stor.storeProduct('');
  }
  ionViewWillEnter() {
    this.cartCounting();
    this.items = this.stor.storeProduct('');
  }

  addToCart(item){
    item.quantity+=1;
    //this.cartCount +=1;
    this.stor.storeProduct(this.items);
    this.cartCounting();
    //sessionStorage.setItem('cartCount',this.cartCount);
    //console.log(JSON.stringify(item));
    //this.cartlist.push({"product_id":item.id,"qty":item.quantity});
  }

  removeFromCart(item){
    if(item.quantity>0){
      item.quantity-=1;
      //this.cartCount -=1;
      this.stor.storeProduct(this.items);
      this.cartCounting();
      //sessionStorage.setItem('cartCount',this.cartCount);
      //console.log(JSON.stringify(item));
    }else{
      console.log("No item selected");
    }
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
    }
    console.log(countprod);
    this.cartCount = countprod;
    this.total = tot;
  }

  gotToCart(){
    this.navCtrl.push(CartItemsPage);
  }

}

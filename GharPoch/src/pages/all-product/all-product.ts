import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsOprationsProvider } from '../../providers/products-oprations/products-oprations';
import { CartPage } from '../cart/cart';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodOpr:ProductsOprationsProvider) {
    this.header_id = navParams.get('selected_id');
    this.header_name = navParams.get('selected_cat');
    this.cartCount=0;
    
}

  ionViewDidLoad() {
    this.prodOpr.getAllProduct()
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
      });
  }

  addToCart(item){
    item.quantity+=1;
    this.cartCount +=1;
    sessionStorage.setItem('cartCount',this.cartCount);
  }

  removeFromCart(item){
    if(item.quantity>0){
      item.quantity-=1;
      this.cartCount -=1;
      sessionStorage.setItem('cartCount',this.cartCount);
    }else{
      console.log("No item selected");
    }
  }

  gotToCart(){
    this.navCtrl.push(CartPage);
  }

}

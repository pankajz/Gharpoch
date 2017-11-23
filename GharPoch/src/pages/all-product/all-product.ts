import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  vegetabletab:any;
  grocerytab:any;
  dairytab:any
  snacktab:any;
  housetab:any;
  personaltab:any;
  timeRadioOpen: boolean;
  timeRadioResult;
  expresstime:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prodOpr:ProductsOprationsProvider, public stor :StorageProvider,public alertCtrl: AlertController) {
    this.header_id = navParams.get('selected_id');
    this.header_name = navParams.get('selected_cat');
    this.cartCount=0;
    this.cartCounting();
    if(this.header_id=='11'){
      this.vegetabletab = 'vegetables';
    }
    if(this.header_id=='12'){
      this.grocerytab = 'rice';
    }
    if(this.header_id=='13'){
      this.dairytab = 'bakeryprod';
    }
    if(this.header_id=='14'){
      this.snacktab = 'noodle';
    }
    if(this.header_id=='15'){
      this.housetab = 'cleaning';
    }
    if(this.header_id=='16'){
      this.personaltab = 'baby';
    }
    if(sessionStorage.getItem('expressTime')){
      this.expresstime = sessionStorage.getItem('expressTime');
    }else{
      this.expresstime = '8:30AM TO 9:30PM';
    }
    
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
    console.log(this.items);
    if(sessionStorage.getItem('expressTime')){
      this.expresstime = sessionStorage.getItem('expressTime');
    }else{

    }
    
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
          if(allprod[i].offer_price){
            tot += (allprod[i].offer_price*allprod[i].quantity);
          }else{
            tot += (allprod[i].sell_price*allprod[i].quantity);
          }
          
        }
      }
    }
    console.log(countprod);
    this.cartCount = countprod;
    this.total = tot;
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

  timeslot(){
    let alert = this.alertCtrl.create();
    alert.setTitle('DELIVERY SLOATS');
    alert.setSubTitle('CHOOSE DELIVERY SLOATS PER YOUR CONVENIENCE')

    alert.addInput({
      type: 'radio',
      label: '8:30AM TO 10:30AM',
      value: '8:30AM TO 10:30AM',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '12:30PM TO 2:30PM',
      value: '12:30PM TO 2:30PM'
    });

    alert.addInput({
      type: 'radio',
      label: '4:00PM TO 6:00PM',
      value: '4:00PM TO 6:00PM'
    });

    alert.addInput({
      type: 'radio',
      label: '7:00PM TO 9:00PM',
      value: '7:00PM TO 9:00PM'
    });

    //alert.addButton('Cancel');
    alert.addButton({
      text: 'SUBMIT',
      handler: data => {
        console.log('Radio data:', data);
        this.timeRadioOpen = false;
        this.timeRadioResult = data;
        sessionStorage.setItem('expressTime',this.timeRadioResult);
        this.expresstime = this.timeRadioResult ;
      }
    });

    alert.present().then(() => {
      this.timeRadioOpen = true;
    });
  }

}

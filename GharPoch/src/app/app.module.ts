import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShopPage } from '../pages/shop/shop';
import { CategoryPage } from '../pages/category/category';
import { SignupPage } from '../pages/signup/signup';
import { WebServiceProvider } from '../providers/web-service/web-service';
import { AllProductPage } from '../pages/all-product/all-product';
import { ProductsOprationsProvider } from '../providers/products-oprations/products-oprations';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShopPage,
    CategoryPage,
    SignupPage,
    AllProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShopPage,
    CategoryPage,
    SignupPage,
    AllProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebServiceProvider,
    ProductsOprationsProvider
  ]
})
export class AppModule {}

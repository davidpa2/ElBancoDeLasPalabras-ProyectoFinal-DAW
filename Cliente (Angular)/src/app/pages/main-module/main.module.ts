import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MainRoutingModule } from './main-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { IndexComponent } from './pages/index/index.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RateStarsComponent } from 'src/app/components/rate-stars/rate-stars.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PriceComponent } from 'src/app/components/price/price.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';

@NgModule({
  declarations: [
    IndexComponent,
    UploadBookComponent,
    ProfileComponent,
    RateStarsComponent,
    ProductsComponent,
    ProductViewComponent,
    PurchaseComponent,
    PriceComponent,
    ExchangeComponent
  ],
  imports: [
    MainRoutingModule, CommonModule, GoogleMapsModule,
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { IndexComponent } from './pages/index/index.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RateStarsComponent } from 'src/app/components/rate-stars/rate-stars.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { PriceComponent } from 'src/app/components/price/price.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { ConfirmExchangesComponent } from './pages/confirm-exchanges/confirm-exchanges.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    IndexComponent,
    UploadBookComponent,
    ProfileComponent,
    RateStarsComponent,
    ProductsComponent,
    ProductViewComponent,
    PriceComponent,
    ExchangeComponent,
    ConfirmExchangesComponent,
    EditProfileComponent
  ],
  imports: [
    MainRoutingModule, CommonModule, GoogleMapsModule, ReactiveFormsModule
  ]
})
export class MainModule { }

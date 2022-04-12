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

@NgModule({
  declarations: [
    IndexComponent,
    UploadBookComponent,
    ProfileComponent,
    RateStarsComponent,
    ProductsComponent,
    ProductViewComponent
  ],
  imports: [
    MainRoutingModule, CommonModule, GoogleMapsModule,
  ]
})
export class MainModule { }

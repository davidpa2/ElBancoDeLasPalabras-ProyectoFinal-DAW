import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RateStarsComponent } from 'src/app/components/rate-stars/rate-stars.component';
import { ProductsComponent } from './pages/products/products.component';

@NgModule({
  declarations: [
    IndexComponent,
    UploadBookComponent,
    ProfileComponent,
    RateStarsComponent,
    ProductsComponent
  ],
  imports: [
    MainRoutingModule, CommonModule
  ]
})
export class MainModule { }

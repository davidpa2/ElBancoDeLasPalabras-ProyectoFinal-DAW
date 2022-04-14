import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'uploadBook', component: UploadBookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'productView', component: ProductViewComponent },
  { path: 'purchase/:idBook', component: PurchaseComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class MainRoutingModule { }

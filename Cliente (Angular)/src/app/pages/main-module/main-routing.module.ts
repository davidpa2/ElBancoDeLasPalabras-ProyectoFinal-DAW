import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmExchangesComponent } from './pages/confirm-exchanges/confirm-exchanges.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'uploadBook', component: UploadBookComponent },
  { path: 'modifyBook/:id', component: UploadBookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'productView/:id', component: ProductViewComponent },
  { path: 'purchase/:idBook', component: PurchaseComponent },
  { path: 'exchange/:idS/:idP', component: ExchangeComponent },
  { path: 'confirmExchanges', component: ConfirmExchangesComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }

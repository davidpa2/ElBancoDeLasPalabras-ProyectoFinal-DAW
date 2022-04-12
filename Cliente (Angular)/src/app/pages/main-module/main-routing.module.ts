import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'uploadBook', component: UploadBookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductsComponent },
  /* { path: '', redirectTo: 'index', pathMatch: 'full' }, */
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class MainRoutingModule { }

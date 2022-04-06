import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'uploadBook', component: UploadBookComponent },
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

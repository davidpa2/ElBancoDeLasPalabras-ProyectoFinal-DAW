import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';


@NgModule({
  declarations: [
    IndexComponent,
    UploadBookComponent
  ],
  imports: [
    MainRoutingModule
  ]
})
export class MainModule { }

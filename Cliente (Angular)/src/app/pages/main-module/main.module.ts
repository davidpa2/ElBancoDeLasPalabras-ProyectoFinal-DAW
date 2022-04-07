import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';


@NgModule({
  declarations: [
    IndexComponent,
    UploadBookComponent
  ],
  imports: [
    MainRoutingModule, CommonModule
  ]
})
export class MainModule { }

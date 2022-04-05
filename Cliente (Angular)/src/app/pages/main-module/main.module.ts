import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    MainRoutingModule
  ]
})
export class MainModule { }

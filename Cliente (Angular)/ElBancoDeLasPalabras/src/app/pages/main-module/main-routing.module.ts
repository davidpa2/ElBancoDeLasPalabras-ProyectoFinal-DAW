import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  /* { path: '', redirectTo: 'index', pathMatch: 'full' }, */
  { path: '', component: IndexComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class MainRoutingModule { }

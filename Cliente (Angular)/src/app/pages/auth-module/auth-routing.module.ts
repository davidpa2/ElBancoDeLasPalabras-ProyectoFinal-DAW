import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgottenPassword', component: ForgottenPasswordComponent},
  /* {
    path: 'changePassword',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
  },
  {
    path: 'forgottenPassword',
    loadChildren: () => import('./pages/forgotten-password/forgotten-password.module').then(m => m.ForgottenPasswordModule)
  },
  {
    path: 'newPassword',
    loadChildren: () => import('./pages/passactivate/passactivate.module').then(m => m.PassActivatePageModule)
  }, */
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [

  ]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { MainRoutingModule } from '../main-module/main-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgottenPasswordComponent
  ],
  imports: [
    AuthRoutingModule, MainRoutingModule
  ],
  exports: [AuthRoutingModule, MainRoutingModule]
})
export class AuthModule { }

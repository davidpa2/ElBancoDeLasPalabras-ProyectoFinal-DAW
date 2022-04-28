import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPass = false;
  submitted = false;
  invalid = false;
  loginForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      pass: new FormControl('', [Validators.required])
    })
  }

  authUser() {
    this.submitted = true;

    if (this.loginForm.valid) {
      var jsonUser = {
        email: (this.loginForm.controls['email'].value),
        pass: (this.loginForm.controls['pass'].value),
      }
      
      this.userService.autenticaUsuario(this.loginForm.controls['email'].value, Md5.hashStr(this.loginForm.controls['pass'].value)).subscribe(data => {
        console.log(data);
        if (data.jwt) {
          this.userService.JWT = data.jwt;
          this.userService.emitirNuevoCambioEnUsuarioAutenticado();
          this.router.navigate(['/index']);
        } else {
          this.invalid = true;
        }
      })
      console.log("Datos obtenidos: "+ JSON.stringify(jsonUser));
    } 
  }

  get myForm() {
    return this.loginForm.controls;
  }

}

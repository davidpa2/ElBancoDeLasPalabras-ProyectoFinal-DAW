import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      pass: new FormControl('', [Validators.required])
    })
  }

  authUser() {
    console.log(this.myForm['email'].errors);
    this.submitted = true;
    if (this.loginForm.valid) {
      var jsonUser = {
        email: (this.loginForm.controls['email'].value),
        pass: (this.loginForm.controls['pass'].value),
      }

      console.log("Datos obtenidos: "+ JSON.stringify(jsonUser));
    }

    
  }

  get myForm() {
    return this.loginForm.controls;
  }

}

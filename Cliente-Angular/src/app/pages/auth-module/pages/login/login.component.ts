import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.minLength(4)]),
      pass: new FormControl('', [Validators.required,Validators.minLength(4)])
    })
  }

  authUser() {
    console.log(this.loginForm.controls['email'].valid);
    
    var jsonUser = {
      email: (this.loginForm.controls['email'].value),
      pass: (this.loginForm.controls['pass'].value),
    }

    console.log(jsonUser);
    
  }

}

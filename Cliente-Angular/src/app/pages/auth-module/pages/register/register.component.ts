import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  passEquals = true;
  registerForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surnames: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      pass: new FormControl('', [Validators.required]),
      repeatPass: new FormControl('', [Validators.required])
    })
  }

  authUser() {
    this.submitted = true;

    if (this.registerForm.valid) {
      if (this.registerForm.value.pass == this.registerForm.value.repeatPass) {
        this.userService.registerUser(this.registerForm.value.name, this.registerForm.value.surnames, this.registerForm.value.email,
          Md5.hashStr(this.registerForm.value.pass)).subscribe(data => {
            console.log(data);
            if (data.jwt) {
              this.userService.JWT = data.jwt;
              this.userService.emitirNuevoCambioEnUsuarioAutenticado();
              this.router.navigate(['/editProfile']);
            }
          })
      } else {
        this.passEquals = false;
      }
    }
  }

  get myForm() {
    return this.registerForm.controls;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  recoveryForm!: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')])
    })
  }

  recovery() {
    this.submitted = true;

    if (this.recoveryForm.valid) {
      console.log('SA MANDAO');
      
    }
  }

  get myForm() {
    return this.recoveryForm.controls;
  }

}

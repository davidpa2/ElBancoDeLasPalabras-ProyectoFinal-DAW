import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user!: User;
  editUserForm!: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();
    
    this.editUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surnamos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      tlf: new FormControl('', [Validators.required, Validators.pattern('(\d{3}\s\d{2}\s\d{2}\s\d{2})|(\d{3}\s\d{3}\s\d{3}\s\d{2})')]),
      birthday: new FormControl('', [Validators.required, Validators.pattern('\d{2}/\d{2}/\d{4}')]),
      telegram: new FormControl('', []),
      desc: new FormControl('', [Validators.required]),
    })
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  saveChanges() {

  }

  get myForm() {
    return this.editUserForm.controls;
  }
}

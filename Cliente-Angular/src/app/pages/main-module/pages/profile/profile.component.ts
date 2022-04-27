import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;
  tabSelected: any = 1;

  constructor() { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  round(number: number) {
    return Math.round(number);
  }
}

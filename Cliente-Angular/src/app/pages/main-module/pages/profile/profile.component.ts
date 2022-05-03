import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changedInfo!: boolean;
  user!: User;
  tabSelected: any = 1;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.changedInfo = false;
    this.route.queryParams.subscribe(params => {
      console.log(params['change']);
      
      this.changedInfo = params['change'];
    })

    this.recuperarUsuarioLog();

    this.userService.cambiosEnUserAutenticado.subscribe(data => {
      console.log('Hay un cambio en el usuario autenticado (edit profile)', data);
      //this.user = this.userService.authenticatedUser;
      this.user = data;
    });
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  round(number: number) {
    return Math.round(number);
  }
}

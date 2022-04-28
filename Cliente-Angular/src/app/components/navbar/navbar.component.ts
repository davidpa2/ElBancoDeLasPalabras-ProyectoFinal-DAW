import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();

    //Protección de rutas
    /* if (this.user != null) {
      this.router.navigate(['/index']);
    }
    if (this.user == null) {
      this.router.navigate(['/auth/login']);
    } 
    
    if (!this.user.tlf) {
      this.router.navigate(['/editProfile'])
    }*/

    this.userService.cambiosEnUserAutenticado.subscribe(data => {
      console.log('Hay un cambio en el usuario autenticado', data);
      console.log(this.userService.authenticatedUser.email);
      //this.user = this.userService.authenticatedUser;
      this.user = data;
    });
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
  }

  logOut() {
    this.user = JSON.parse('{}');
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    //window.location.href = "/login";
  }

}

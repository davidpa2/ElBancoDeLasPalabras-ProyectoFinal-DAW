import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{

  user!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();
    console.log(this.user);
    
  }
  
  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    console.log(localStorage.getItem("authenticatedUser"));
    
  }
}

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();

    this.userService.cambiosEnUserAutenticado.subscribe(data => {
      this.user = data;
      this.bookService.emitPendingExchanges();
    });
    
    if (localStorage.getItem("authenticatedUser")) {
      this.bookService.emitPendingExchanges();
    }
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
  }
}

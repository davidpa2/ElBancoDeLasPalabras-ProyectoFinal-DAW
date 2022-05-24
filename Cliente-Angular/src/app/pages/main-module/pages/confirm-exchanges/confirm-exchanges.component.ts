import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-confirm-exchanges',
  templateUrl: './confirm-exchanges.component.html',
  styleUrls: ['./confirm-exchanges.component.scss']
})
export class ConfirmExchangesComponent implements OnInit {

  authUser!: User;
  bookBuyReservedList: Book[] = [];
  userBuyReservedList: User[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();
    this.getBuyReservedBooks();

  }

  getBuyReservedBooks() {
    this.bookService.getBuyReservedBooks(this.authUser.id).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.bookBuyReservedList = data['books'];
        this.userBuyReservedList = data['users'];
      }
    })
  }

  recuperarUsuarioLog() {
    this.authUser = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
  }
}

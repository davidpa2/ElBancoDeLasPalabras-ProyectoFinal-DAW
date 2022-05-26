import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirm-exchanges',
  templateUrl: './confirm-exchanges.component.html',
  styleUrls: ['./confirm-exchanges.component.scss']
})
export class ConfirmExchangesComponent implements OnInit {

  authUser!: User;
  bookBuyReservedList: Book[] = [];
  userBuyReservedList: User[] = [];

  showConfirmModal = false;
  bookSelected = 0;
  soldBook!: String;

  constructor(private bookService: BookService, private _location: Location) { }

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

  confirmPurchase(id: number, title: String) {
    this.showConfirmModal = false;
    this.bookService.sellBook(id).subscribe(data => {
      if (data['estado'] = 'correcto') {
        console.log(' SE HA VENDIDO EL LIBRO ');
        this.soldBook = title;
        this.getBuyReservedBooks();
        this.scrollUp();
      }
    })
  }

  recuperarUsuarioLog() {
    this.authUser = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
  }

  goBack() {
    this._location.back();
  }

  scrollUp() {
    window.scrollTo(0, 0)
  }
}

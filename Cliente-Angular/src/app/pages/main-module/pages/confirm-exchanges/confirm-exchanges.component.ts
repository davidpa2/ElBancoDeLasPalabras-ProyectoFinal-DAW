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
  //Lista en la que se guardarán los libros reservados pendientes de compra
  bookBuyReservedList: Book[] = [];
  //Lista en la que se guardarán los usuarios que han solicitado la compra de tus libros
  userBuyReservedList: User[] = []; //Está emparejada con la de los libros
  
  //Lista en la que se guardarán los libros que ofrecen los usuarios intercambiar
  bookPExchangeReservedList: Book[] = [];
  //Lista en la que se guardarán los usuarios que han solicitado intercambio de tus libros
  petitionerExchangeReservedList: User[] = []; //Está emparejada con la de los libros
  //Lista en la que se guardarán los libros solicitados por otros usuarios
  bookOExchangeReservedList: Book[] = []; //Está emparejada con la de los libros ofrecidos y la de los usuarios

  showConfirmBuyModal = false;
  showCancelBuyModal = false;
  showConfirmExchangeModal = false;
  showCancelExchangeModal = false;
  bookSelected = 0;
  exchangeSelected = 0;
  soldBook!: String;
  cancelledPurchaseBook!: String;
  petitionerExchanged!: String;
  cancelExchangePertioner!: String;

  constructor(private bookService: BookService, private _location: Location) { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();
    this.getBuyReservedBooks();
    this.getExchangeReservedBooks();
  }

  getBuyReservedBooks() {
    this.bookService.getBuyReservedBooks(this.authUser.id).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.bookBuyReservedList = data['books'];
        this.userBuyReservedList = data['users'];
      }
    })
  }

  getExchangeReservedBooks() {
    this.bookService.getExchangeReservedBooks(this.authUser.id).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.bookPExchangeReservedList = data['booksP']
        this.petitionerExchangeReservedList = data['usersP'];
        this.bookOExchangeReservedList = data['booksO'];
      }
    })
  }

  confirmPurchase(id: number, title: String) {
    this.showConfirmBuyModal = false;
    this.bookService.sellBook(id).subscribe(data => {
      if (data['estado'] = 'correcto') {
        this.petitionerExchanged = ''; this.cancelExchangePertioner = ''; this.cancelledPurchaseBook = '';
        this.soldBook = title;
        this.getBuyReservedBooks();
        this.scrollUp();
      }
    })
  }

  cancelPurchase(id: number, title: String) {
    this.showCancelBuyModal = false;
    this.bookService.cancelPurchase(id).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.soldBook = ''; this.cancelExchangePertioner = ''; this.petitionerExchanged = '';
        this.cancelledPurchaseBook = title;
        this.getBuyReservedBooks();
        this.scrollUp();
      }
    })
  }

  confirmExchange(bookP: Book, petitioner: User, bookO: Book) {
    this.showConfirmExchangeModal = false;
    this.bookService.exchangeBooks(bookP, petitioner, bookO, this.authUser).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.soldBook = ''; this.cancelExchangePertioner = ''; this.cancelledPurchaseBook = '';
        this.petitionerExchanged = this.petitionerExchangeReservedList[this.exchangeSelected].name;
        this.getExchangeReservedBooks();
        this.scrollUp();
      }
    })
  }

  cancelExchange(bookP: Book, petitioner: User, bookO: Book) {
    this.showCancelExchangeModal = false;
    this.bookService.cancelExchangeBooks(bookP, petitioner, bookO, this.authUser).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.soldBook = ''; this.petitionerExchanged = ''; this.cancelledPurchaseBook = '';
        this.cancelExchangePertioner = this.petitionerExchangeReservedList[this.exchangeSelected].name;
        this.getExchangeReservedBooks();
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

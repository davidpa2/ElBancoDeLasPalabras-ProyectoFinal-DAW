import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { SendMailService } from 'src/app/services/send-mail.service';

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
  showValueUserModal = false;
  bookSelected = 0;
  exchangeSelected = 0;
  soldBook!: String;
  cancelledPurchaseBook!: String;
  petitionerExchanged!: String;
  cancelExchangePertioner!: String;
  stars = 0;
  sendedRate = false;
  ratingUser = {
    id: 0,
    name: '',
    surnames: '',
    img: ''
  }

  constructor(private bookService: BookService, private userService: UserService, private _location: Location) { }

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
        //Rellenamos el objeto ratingUser para poder valorar al usuario
        this.ratingUser = {
          id: this.userBuyReservedList[this.bookSelected].id,
          name: this.userBuyReservedList[this.bookSelected].name,
          surnames: this.userBuyReservedList[this.bookSelected].surnames,
          img: this.userBuyReservedList[this.bookSelected].img,
        }
        this.petitionerExchanged = ''; this.cancelExchangePertioner = ''; this.cancelledPurchaseBook = '';
        this.soldBook = title;
        this.showValueUserModal = true;
        this.scrollUp();
        this.getBuyReservedBooks();
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

        this.ratingUser = {
          id: this.petitionerExchangeReservedList[this.exchangeSelected].id,
          name: this.petitionerExchangeReservedList[this.exchangeSelected].name,
          surnames: this.petitionerExchangeReservedList[this.exchangeSelected].surnames,
          img: this.petitionerExchangeReservedList[this.exchangeSelected].img,
        }
        this.soldBook = ''; this.cancelExchangePertioner = ''; this.cancelledPurchaseBook = '';
        this.petitionerExchanged = this.petitionerExchangeReservedList[this.exchangeSelected].name;
        this.getExchangeReservedBooks();
        this.scrollUp();
        this.showValueUserModal = true;
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

  rateUser(id: number) {
    this.sendedRate = true;

    if (this.stars) {
      this.userService.rateUser(id, this.stars).subscribe(data => {
        if (data['estado'] == 'correcto') {
          this.showValueUserModal = false;
          this.stars = 0;
          this.sendedRate = false;
          this.ratingUser = {
            id: 0,
            name: '',
            surnames: '',
            img: ''
          }
        }
      })
    }
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

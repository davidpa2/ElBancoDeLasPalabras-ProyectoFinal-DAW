import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  center = { lat: 24, lng: 12 };
  zoom = 20;
  display?: google.maps.LatLngLiteral;

  authUser!: User;
  userOwner!: User;
  book!: Book;
  bookList: Book[] = [];
  countBooks: number = 0;

  showModal = false;
  showPurchaseModal = false;
  reserved = false; // Una vez se reserva un libro sabemos que se ha reservado
  bookReserved = false; // Si visitamos este libro y está ya reservado
  reserveError = false;

  constructor(private bookService: BookService, private userService: UserService, private route: ActivatedRoute,
    private _location: Location, private mailService: SendMailService) { }

  ngOnInit(): void {
    this.getBookAndUserById();
    this.recuperarUsuarioLog();
  }

  /**
 * Obtener el libro y usuario que lo subió
 */
  getBookAndUserById() {
    this.bookService.getBookById(this.route.snapshot.params['bookId']).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.book = data['book'];
        //Comprobamos si el libro que se ha solicitado está reservado
        if (data['book'].reserved == '1') {
          this.bookReserved = true;
        }
      }
    });
    this.userService.getUserById(this.route.snapshot.params['userId']).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.userOwner = data['user'];
        this.countBooks = data['countBooks'];
      }
    });
  }

  chooseBook() {
    this.showModal = true;

    if (!this.bookList.length) {
      this.bookService.findBooksByUserId(this.authUser.id).subscribe(data => {
        if (data['estado'] == 'correcto') {
          data.bookList.forEach((b: Book) => {
            this.bookList.push(b);
          });
        }
      })
    }
  }

  confirmPurchase() {
    this.showPurchaseModal = false;

    this.bookService.reserveBuyBook(this.book, this.userOwner, this.authUser).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.scrollUp();
        this.reserved = true;
        // Si se ha hecho bien la petición, mandar un correo al usuario dueño del libro
        this.mailService.buyMail(this.userOwner, this.book).subscribe(data => { });
      } else {
        this.reserveError = true;
        this.scrollUp();
      }
    })
  }

  confirmExchange(idBookP: Book, owner: User) {
    this.showModal = false;
    // Vamos a proceder a reservar ambos libros
    this.bookService.reserveExchangeBook(idBookP, this.authUser, this.book, owner).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.reserved = true;
        this.scrollUp();
        // Si se ha hecho bien la petición, mandar un correo al usuario dueño del libro
        this.mailService.exchangeMail(this.userOwner, this.book).subscribe(data => { });
      }
    })
  }

  recuperarUsuarioLog() {
    this.authUser = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
  }

  scrollUp() {
    window.scrollTo(0, 0)
  }

  goBack() {
    this._location.back();
  }

  round(number: number) {
    return Math.round(number);
  }
}

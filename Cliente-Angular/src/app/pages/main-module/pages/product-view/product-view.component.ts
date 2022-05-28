import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  showModal = false;
  showPurchaseModal = false;
  reserved = false;
  reserveError = false;

  constructor(private bookService: BookService, private userService: UserService, private route: ActivatedRoute, private _location: Location) {}

  ngOnInit(): void {
    this.getBookAndUserById();
    this.recuperarUsuarioLog();
    console.log(this.userOwner);
    
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
          this.reserved = true;
        }
      }
    });
    this.userService.getUserById(this.route.snapshot.params['userId']).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.userOwner = data['user'];
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
        this.reserved = true;
      } else {
        this.reserveError = true;
      }
      this.scrollUp();
    })
  }

  confirmExchange(idBookP: Book, owner: User) {
    this.showModal = false;
    // Vamos a proceder a reservar ambos libros
    this.bookService.reserveExchangeBook(idBookP, this.authUser, this.book, owner).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.reserved = true;
        this.scrollUp();
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
}

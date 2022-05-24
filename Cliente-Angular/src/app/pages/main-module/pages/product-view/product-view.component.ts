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
  user!: User;
  book!: Book;
  bookList: Book[] = [];

  showModal = false;
  showPurchaseModal = false;
  reserved = false;
  reserveError = false;

  constructor(private bookService: BookService, private userService: UserService, private route: ActivatedRoute, private _location: Location) { 
    
  }

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
        if (data['book'].state == '-1') {
          this.reserved = true;
        }
      }
    });
    this.userService.getUserById(this.route.snapshot.params['userId']).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.user = data['user'];
      }
    });
  }

  chooseBook() {
    this.showModal = true;

    if (!this.bookList.length) {
      this.bookService.findBooksByUserId(this.authUser.id, true).subscribe(data => {
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

    this.bookService.reserveBook(this.book.id, this.authUser.id, 1).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.reserved = true;
      } else {
        this.reserveError = true;
      }
    })
  }

  recuperarUsuarioLog() {
    this.authUser = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
  }

  goBack() {
    this._location.back();
  }
}

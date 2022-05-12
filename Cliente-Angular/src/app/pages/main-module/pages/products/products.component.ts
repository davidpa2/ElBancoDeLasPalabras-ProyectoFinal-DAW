import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  bookList: Book[] = [];
  userList: User[] = [];
  user!: User;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    //Primero hay que obtener el usuario que haya iniciado sesión
    this.recuperarUsuarioLog();

    if (!this.user.id) {
      this.getAllBooks();
    } else {
      //Luego obtenemos todos los libros que no pertenezcan a ese usuario
      this.getAllBooksForSale();
    }
  }

  getAllBooksForSale() {
    this.bookService.getAllBooksForSale(this.user.id).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.bookList = data['books'];
        this.userList = data['users'];
        console.log(this.bookList);
        console.log(this.userList);
      }
    });
  }

  getAllBooks() {
    this.bookService.getAllBooksForSale(0).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.bookList = data['books'];
        this.userList = data['users'];
      }
    })
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }
}

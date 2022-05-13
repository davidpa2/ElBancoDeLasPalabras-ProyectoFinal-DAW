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
    //Luego obtenemos todos los libros que no pertenezcan a ese usuario
    this.getAllBooksForSale();
  }

  /**
   * Obtener todo el catálogo de libros a la venta
   */
  getAllBooksForSale() {
    // Puede ocurrir que se haya accedido sin iniciar sesión. Por tanto pasaremos el id como -1 para obtener todos los libros
    this.bookService.getAllBooksForSale(this.user.id ? this.user.id : -1).subscribe(data => {
      if (data['estado'] == "correcto") {
        //Obtenemos una lista de libros y una lista de usuarios, cada uno asociado a un libro
        this.bookList = data['books'];
        this.userList = data['users'];
        console.log(this.bookList);
        console.log(this.userList);
      }
    });
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }
}

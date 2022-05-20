import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BookService } from 'src/app/services/book.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changedInfo!: boolean;
  deletedBook!: boolean;
  user!: User;
  tabSelected: any = 1;
  uploadedBooksList: Book[] = [];
  userId = null;

  constructor(private userService: UserService, private bookService: BookService, private route: ActivatedRoute, private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.scrollUp();
    
    this.route.queryParams.subscribe(params => {
      this.userId = params['idUser'] || null;

      // Visitar perfil de usuario autenticado
      if (!this.userId) {
        this.recuperarUsuarioLog();
        this.getBooks(this.user.id); // Llamada a getBooks por separado para evitar problemas al reusar la vista profile
      } else { // Visitando otro perfil
        this.getUserById(this.userId);
        this.getBooks(this.userId);
      }
    });

    // Comprobar si ha habido cambios en el perfil
    this.changedInfo = false;
    this.deletedBook = false;
    this.route.queryParams.subscribe(params => {
      this.changedInfo = params['change'];
      this.deletedBook = params['deleteBook'];
    })

    this.userService.cambiosEnUserAutenticado.subscribe(data => {
      console.log('Hay un cambio en el usuario autenticado (edit profile)', data);
      //this.user = this.userService.authenticatedUser;
      this.user = data;
    });
  }

  getBooks(id: any) {
    this.uploadedBooksList = []; //Asegurar que la lista está vacía
    this.bookService.findBooksByUserId(id).subscribe(result => {
      if (result['estado'] != "error") {
        result.bookList.forEach((b: Book) => {
          this.uploadedBooksList.push(b)
        });
      }
    });
  }

  getUserById(id: any): any {
    this.userService.getUserById(id).subscribe(data => {
      if (data['estado'] == 'correcto') {
        this.user = data['user'];
      }
    })
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  round(number: number) {
    return Math.round(number);
  }

  goBack() {
    this._location.back();
  }

  scrollUp() {
    window.requestAnimationFrame(this.scrollUp)
    /* window.scrollTo(0, document.documentElement.scrollTop - (document.documentElement.scrollTop / 10)) */
    window.scrollTo(0, 0)
  }
}

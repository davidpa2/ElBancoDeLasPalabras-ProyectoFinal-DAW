import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BookService } from 'src/app/services/book.service';

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

  constructor(private userService: UserService, private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.changedInfo = false;
    this.deletedBook = false;
    this.route.queryParams.subscribe(params => {
      this.changedInfo = params['change'];
      this.deletedBook = params['deleteBook'];
    })

    this.recuperarUsuarioLog();
    this.getBooks();

    this.userService.cambiosEnUserAutenticado.subscribe(data => {
      console.log('Hay un cambio en el usuario autenticado (edit profile)', data);
      //this.user = this.userService.authenticatedUser;
      this.user = data;
    });
  }

  getBooks() {
    this.bookService.findBooksByUserId(this.user.id).subscribe(result => {
      if (result['estado'] != "error") {
        result.bookList.forEach((b: Book) => {
          this.uploadedBooksList.push(b)
        });
      }
    });
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  round(number: number) {
    return Math.round(number);
  }
}

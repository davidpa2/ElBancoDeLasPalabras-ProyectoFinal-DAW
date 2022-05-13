import { Component, OnInit } from '@angular/core';
import { Book, User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  center = { lat: 24, lng: 12 };
  zoom = 15;
  display?: google.maps.LatLngLiteral;

  user!: User;
  book!: Book;

  constructor(private bookService: BookService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookAndUserById();
  }

  /**
 * Obtener el libro y usuario que lo subió
 */
  getBookAndUserById() {
    this.bookService.getBookById(this.route.snapshot.params['bookId']).subscribe(data => {
      if (data['estado'] == "correcto") {
        console.log(data);
        this.book = data['book'];
        console.log(this.book.state);
        
      }
    });
    this.userService.getUserById(this.route.snapshot.params['userId']).subscribe(data => {
      if (data['estado'] == "correcto") {
        this.user = data['user'];
      }
    });
  }
}

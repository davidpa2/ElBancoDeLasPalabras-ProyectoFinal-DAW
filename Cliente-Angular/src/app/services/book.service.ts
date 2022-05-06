import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  uploadBook(title: string, author: string,  description: string, state: number, price: string, img: string, user: User): Observable<Book> {
    var jsonObject = {
      title: title,
      author: author,
      description: description,
      state: state,
      price: price,
      img: img,
      user: user
    };
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<Book>(this.url + '/uploadBook', jsonObject);
  }

  findBooksByUserId(id: any): Observable<any> {
    //http.get() manda una solicitud http y devuelve un objeto Observable que emite los datos solicitados
    return this.http.get<any>(this.url + '/findByUserId/' + id);
  }
}

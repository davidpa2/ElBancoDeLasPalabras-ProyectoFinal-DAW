import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  uploadBook(title: string, author: string, description: string, state: number, price: string, img: string, user: User): Observable<Book> {
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
    return this.http.post<Book>('/uploadBook', jsonObject);
  }

  updateBook(id: number, title: string, author: string, description: string, state: number, price: string, img: string): Observable<Book> {
    var jsonObject = {
      id: id,
      title: title,
      author: author,
      description: description,
      state: state,
      price: price,
      img: img
    };
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<any>('/updateBook', jsonObject);
  }

  lookForABook(search: String, id: number): Observable<any> {
    return this.http.get<any>('/lookForABook/' + search + '/' + id)
  }

  getAllBooksForSale(id: number): Observable<any> {
    return this.http.get<any>('/getAllBooksForSale/' + id)
  }

  deleteBook(id: number): Observable<any> {
    return this.http.get<any>('/deleteBook/' + id);
  }

  findBooksByUserId(id: any, authenticated: boolean): Observable<any> {
    //http.get() manda una solicitud http y devuelve un objeto Observable que emite los datos solicitados
    return this.http.get<any>('/findByUserId/' + id + '/' + authenticated);
  }

  sellBook(id: number): Observable<any> {
    return this.http.get<any>('/sellBook/' + id);
  }

  getBuyReservedBooks(id: any): Observable<any> {
    return this.http.get<any>('/getBuyReservedBooks/' + id);
  }

  getExchangeReservedBooks(id: any): Observable<any> {
    return this.http.get<any>('/getExchangeReservedBooks/' + id);
  }

  getBookById(id: any) {
    return this.http.get<any>('/getBookById/' + id)
  }

  reserveBuyBook(idBook: number, idBuyer: number): Observable<any> {
    return this.http.get<any>('/reserveBuyBook/' + idBook + '/' + idBuyer);
  }

  /**
   * Método usado para reservar un libro cuando se quiere intercambiar
   * @param idBookP id del libro de quien está solicitando intercambio
   * @param idPetitioner id del usuario que está solicitando intercambio
   * @param idBookO id del libro del dueño del libro que se está solicitando
   * @param idOwner id del dueño del libro que se está solicitando
   * @returns 
   */
  reserveExchangeBook(idBookP: Book, idPetitioner: User, idBookO: number, idOwner: number): Observable<any> {
    var jsonObject = {
      bookP: idBookP,
      petitioner: idPetitioner,
      bookO: idBookO,
      owner: idOwner,
    };
    return this.http.post<any>('/reserveExchangeBook', jsonObject);
  }
}
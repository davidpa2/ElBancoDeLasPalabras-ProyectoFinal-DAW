import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenJWT, User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authenticatedUser!: User;
  @Output() cambiosEnMecanicosAutenticado = new EventEmitter<User>();
  @Input() mostrarMecanico: EventEmitter<any> = new EventEmitter();

  JWT!: TokenJWT;

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  /**
   * Método para autenticar al usuario, recibiendo su email y su contraseña.
   */
  autenticaUsuario(email: string, password: string): Observable<TokenJWT> {
    var jsonObject = {
      email: email,
      password: password
    };
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<TokenJWT>(this.url + '/autenticate', jsonObject);
  }

  public getUsuarioAutenticado(): Observable<User> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.JWT}`);
    return this.http.get<User>(this.url + '/authenticatedUserData', { headers: headers });
  }

  emitirNuevoCambioEnUsuarioAutenticado() {
    this.getUsuarioAutenticado().subscribe(authenticatedUser => {
      this.authenticatedUser = authenticatedUser;
      localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
      this.cambiosEnMecanicosAutenticado.emit(authenticatedUser);
    });
  }
}

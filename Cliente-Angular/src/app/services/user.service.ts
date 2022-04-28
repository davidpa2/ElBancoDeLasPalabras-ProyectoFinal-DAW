import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenJWT, User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authenticatedUser!: User;
  @Output() cambiosEnUserAutenticado = new EventEmitter<User>();
  @Input() mostrarUsuario: EventEmitter<any> = new EventEmitter();

  JWT!: TokenJWT;

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  /**
   * Método para autenticar al usuario, recibiendo su email y su contraseña.
   * @param email 
   * @param password 
   * @returns 
   */
  autenticaUsuario(email: string, password: string): Observable<TokenJWT> {
    var jsonObject = {
      email: email,
      password: password
    };
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<TokenJWT>(this.url + '/autenticate', jsonObject);
  }

  /**
   * Método para registrar un nuevo usuario e iniciar sesión con él
   * @param email 
   * @param password 
   * @returns 
   */
  registerUser(name: string, surnames: string,  email: string, password: string): Observable<TokenJWT> {
    var jsonObject = {
      name: name,
      surnames: surnames,
      email: email,
      password: password
    };
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<TokenJWT>(this.url + '/register', jsonObject);
  }

  /**
   * 
   * @returns 
   */
  public getUsuarioAutenticado(): Observable<User> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.JWT}`);
    return this.http.get<User>(this.url + '/authenticatedUserData', { headers: headers });
  }

  /**
   * 
   */
  emitirNuevoCambioEnUsuarioAutenticado() {
    this.getUsuarioAutenticado().subscribe(authenticatedUser => {
      this.authenticatedUser = authenticatedUser;
      localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
      this.cambiosEnUserAutenticado.emit(authenticatedUser);
    });
  }

  /**
   * 
   * @param name 
   * @param surnames 
   * @param description 
   * @param birthday 
   * @param tlf 
   * @param telegram 
   * @param img 
   * @returns 
   */
  modifyUser(id: number, name: String, surnames: String, description: String, birthday: String, tlf: String, telegram: String, img: String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let jsonUser = JSON.stringify({
      id: id,
      name: name,
      surnames: surnames,
      description: description,
      birthday: birthday,
      tlf: tlf,
      telegram: telegram,
      img: img
    });

    return this.http.post<any>(this.url + '/modifyUser', jsonUser, { headers: headers })
  }
}

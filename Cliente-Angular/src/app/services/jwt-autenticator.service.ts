import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtAutenticatorService {

  jwtSession!: string;

  constructor() { }

  /**
   * Almacenar el jwt recibido
   * @param token 
   */
  storeJWT(token: string) {
    localStorage.setItem("jwt", token);
  }

  getJWT() {
    return localStorage.getItem("jwt");
  }

  removeJWT() {
    localStorage.removeItem("jwt");
  }
}

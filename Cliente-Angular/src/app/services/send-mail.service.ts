import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }

  passRecoveryMail(mail: string, idUser: number): Observable<any> {
    var jsonObject = {
      mail: mail,
      idUser: idUser
    };
    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<any>('/sendMail', jsonObject);
  }
}

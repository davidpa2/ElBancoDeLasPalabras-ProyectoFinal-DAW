import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { JwtAutenticatorService } from './jwt-autenticator.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  urlWebAPI = "http://localhost:8080";

  constructor(private jwtAutenticator: JwtAutenticatorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Intento obtener el token JWT guardado en el AutenticadorJWT. Si ese token existe, lo meto en una cabecera de la petición que
    // va a salir hacia el servidor
    const token = this.jwtAutenticator.getJWT();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    // Si no se ha especificado una cabecera 'Content-Type', introduzco una que indica que se envían datos JSON y se codifican con utf-8
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
    }

    // Especifico que la petición http va a aceptar una respuesta en formato JSON.
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    // Agrego, a la URL a la que viaja la petición web, el prefijo que indica la dirección del servidor.
    const newUrl = { url: this.urlWebAPI + request.url };
    request = Object.assign(request, newUrl);
    const newUrlWithParams = { urlWithParams: this.urlWebAPI + request.urlWithParams };
    request = Object.assign(request, newUrlWithParams);

    // Permito que la petición http continúe su curso.
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //          console.log('event--->>>', event);  // Si utilizas esta línea obtendrás un log de todas las respuestas http recibidas en tu app
        }
        return event;
      }),
      finalize(() => {
      })
    );
  }
}

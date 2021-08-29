import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'ngprime-core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${environment.API_URL}`;

    if (request.url.startsWith(url) === false) {
      return next.handle(request);
    }
    
    const token = this.authSvc.getToken() || '';
    const body = {
      ide_segemp: localStorage.getItem('ide_segemp') || null,
      ide_segsuc: localStorage.getItem('ide_segsuc') || null,
      ide_segusu: localStorage.getItem('ide_segusu') || null,
      usuario: localStorage.getItem('username') || null
    };
    const reqClone = request.clone({
      setHeaders: {
        'x-token': token,
      },
      body: { ...request.body, ...body }
    });
    return next.handle(reqClone).pipe(
      catchError(error => {
        const err = {
          status: error.status,
          statusText: error.statusText,
          ok: error.ok,
          name: error.name,
          message: error.message,
          error: error.error
        };
        const errorMessage = err.error;
        const statusText = err.statusText;
        const errorName = err.name;
        const status = err.status;
        if (statusText === 'Unknown Error' && errorName === 'HttpErrorResponse' && status === 0) {
          this.mensajeServidor('No se puede conectar con el servidor, contactese con el administrador o técnico.');
        } else if (err.error.caducado === true && status === 401) {
          this.authSvc.mensajeSesionCaducado(err.error.mensaje);
        }else if (status === 401) {
          this.mensajeNoAutorizado(err.error.mensaje);
        }
        return throwError(err);
      }));
  }

  private mensajeSesionCaducado(mensaje: string): void {
    Swal.fire({
      imageUrl: 'assets/img/500.jpg',
      title: 'Sesión caducada',
      text: mensaje,
      allowOutsideClick: false,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      showConfirmButton: true,
    }).then(resp => {
      if (resp.value) {
        this.authSvc.logout();
      }
    });
  }

  private mensajeNoAutorizado(mensaje: string): void{
    Swal.fire({
      imageUrl: 'assets/img/401.jpg',
      title: 'No autorizado',
      text: mensaje,
      allowOutsideClick: true,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
      backdrop: true
    });
  }

  private mensajeServidor(mensaje: string): void{
    Swal.fire({
      imageUrl: 'assets/img/500.jpg',
      title: 'Error de conexión',
      text: mensaje,
      allowOutsideClick: true,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
      backdrop: true
    });
  }
}

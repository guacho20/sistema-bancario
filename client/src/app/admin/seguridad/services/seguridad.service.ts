import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilitarioService } from 'ngprime-core';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  api = environment.API_URL;

  constructor(private http: HttpClient, private utilitarioSvc: UtilitarioService) { }
  
  /**
   * Registra a los nuevos usuarios con sus respectivos usuario
   * @param body 
   * @returns 
   */
  saveUser(body) {
    return this.http.post<any>(`${this.api}/seguridad/saveUser`, body).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }

  resetPassword(body){
    return this.http.post<any>(`${this.api}/seguridad/resetPassword`, body).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }

}

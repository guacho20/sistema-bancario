import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilitarioService } from 'ngprime-core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GerencialService {
  api = environment.API_URL;
  constructor(private http: HttpClient, private utilitarioSvc: UtilitarioService) { }

  getProyecto() {
    const body = {};
    return this.http.post<any>(`${this.api}/gerencialpdot/getProyecto`, body).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }

  getPostMeta(proyecto) {
    const body = { ide_proyecto: proyecto };
    return this.http.post<any>(`${this.api}/gerencialpdot/getPostMeta`, body).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }

  getPostProyectoIndicador(proyecto, objetivo) {
    const body = { ide_proyecto: proyecto, ide_objetivo: objetivo };
    return this.http.post<any>(`${this.api}/gerencialpdot/getPostProyectoIndicador`, body).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }

  getDetalleProyecto(body) {
    const etiqueta = [];
    const valor = [];
    return this.http.post<any>(`${this.api}/gerencialpdot/getDetalleProyecto`, body).pipe(
      map(res => {
        res.datos.forEach(element => {
          // console.log(element);
          etiqueta.push(element.anio+' '+element.abreviatura_ystmen)
          valor.push(element.suma_porce)
        });
        const datosGrafico =this.generarDatosGrafico(etiqueta, valor, 'Control PDOT')
        // console.log(etiqueta);
        return {datos: res.datos, datosGrafico};
      }),
      catchError(err => {
        this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }


  private generarDatosGrafico(etiqueta, valor, titulo: string) {
    return {
      labels: etiqueta,
      datasets: [{
        label: titulo,
        backgroundColor: [
          '#EC407A',
          '#AB47BC',
          '#42A5F5',
          '#7E57C2',
          '#66BB6A',
          '#FFCA28',
          '#26A69A'
        ],
        data: valor
      }
      ]
    };
  }

}

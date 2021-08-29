import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilitarioService } from 'ngprime-core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerencialpdotService {
  progressRef: NgProgressRef;
  api = environment.API_URL;
  constructor(private http: HttpClient, private utilitarioSvc: UtilitarioService, private progress: NgProgress) {
    this.progressRef = progress.ref('progressBarUpload');
    this.progressRef.setConfig({ color: 'green', thick: true, fixed: false });
  }

  /**
   * Verifica si existe el proyecto si no existe lo crea
   * @param proyecto detalle del proyecto
   * @returns 
   */
  existeProyecto(proyecto: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const sql = 'select ide_proyecto from ge_proyecto where UPPER (detalle_proyecto) = $1';
      await this.utilitarioSvc.getConsultaGenerica(sql, [proyecto]).subscribe(async project => {
        if (project.datos.length > 0) {
          resolve(project.datos[0].ide_proyecto);
        } else {
          // console.log('No exite ese proyecto tengo que insertar');
          const sql = 'insert into ge_proyecto (detalle_proyecto) values ($1) RETURNING ide_proyecto;';
          await this.utilitarioSvc.getConsultaGenerica(sql, [proyecto]).subscribe(newProyecto => {
            resolve(newProyecto.datos[0].ide_proyecto);
          }, (err) => {
            reject(err);
          })
        }
      }, (err) => {
        reject(err);
      })
    });
  }

  /**
   * Verifica si existe una meta si no la crea
   * @param proyecto 
   * @param meta 
   * @returns 
   */
  existeMeta(proyecto: string, meta: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const sql = 'select ide_objetivo from ge_objetivo where UPPER (detalle_objetivo) = $1 and ide_proyecto=$2';
      await this.utilitarioSvc.getConsultaGenerica(sql, [meta, proyecto]).subscribe(async project => {
        if (project.datos.length > 0) {
          resolve(project.datos[0].ide_objetivo);
        } else {
          // console.log('No exite ese meta tengo que insertar');
          const sql = 'insert into ge_objetivo (detalle_objetivo, ide_proyecto) values ($1, $2) RETURNING ide_objetivo;';
          await this.utilitarioSvc.getConsultaGenerica(sql, [meta, proyecto]).subscribe(newProyecto => {
            resolve(newProyecto.datos[0].ide_objetivo);
          }, (err) => {
            reject(err);
          })
        }
      }, (err) => {
        reject(err);
      })
    });
  }

  /**
   * Verifica si existe un indicador si no la crea
   * @param indicador 
   * @param abreviatura 
   * @returns 
   */
  existeIndicador(indicador: string, abreviatura: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const sql = 'select ide_perspectiva from ge_perspectiva where UPPER (detalle_perspectiva) = $1';
      await this.utilitarioSvc.getConsultaGenerica(sql, [indicador]).subscribe(async project => {
        if (project.datos.length > 0) {
          resolve(project.datos[0].ide_perspectiva);
        } else {
          // console.log('No exite ese indicador tengo que insertar');
          const sql = 'insert into ge_perspectiva (detalle_perspectiva,abreviatura_ystmen) values ($1, $2) RETURNING ide_perspectiva;';
          await this.utilitarioSvc.getConsultaGenerica(sql, [indicador, abreviatura]).subscribe(newProyecto => {
            resolve(newProyecto.datos[0].ide_perspectiva);
          }, (err) => {
            reject(err);
          })
        }
      }, (err) => {
        reject(err);
      })
    });
  }

  /**
   * Verifica si existe una frecuencia si no la crea
   * @param frecuencia 
   * @returns 
   */
  existeFrecuencia(frecuencia: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const sql = 'select ide_frecuencia from ge_frecuencia where UPPER (detalle_frecuencia) = $1';
      await this.utilitarioSvc.getConsultaGenerica(sql, [frecuencia]).subscribe(async project => {
        if (project.datos.length > 0) {
          resolve(project.datos[0].ide_frecuencia);
        } else {
          // console.log('No exite ese frecuencia tengo que insertar');
          const sql = 'insert into ge_frecuencia (detalle_frecuencia) values ($1) RETURNING ide_frecuencia;';
          await this.utilitarioSvc.getConsultaGenerica(sql, [frecuencia]).subscribe(newProyecto => {
            resolve(newProyecto.datos[0].ide_frecuencia);
          }, (err) => {
            reject(err);
          })
        }
      }, (err) => {
        reject(err);
      })
    });
  }

  /**
   * Inserta la tabla de matriz de frecuencia
   * @param meta 
   * @param indicador 
   * @param frecuencia 
   * @param abs 
   * @param crece 
   * @param valor_meta 
   * @param linea_base 
   * @param detalle_linea 
   * @param detalle_meta 
   * @returns 
   */
  insertarMatrizFrecuencia(meta, indicador, frecuencia, abs, crece, valor_meta, linea_base, detalle_linea, detalle_meta) {
    return new Promise(async (resolve, reject) => {
      const sql = 'select ide_matriz from ge_matriz_frecuencia where ide_perspectiva=$1 and ide_objetivo=$2';
      await this.utilitarioSvc.getConsultaGenerica(sql, [indicador, meta]).subscribe(async project => {
        if (project.datos.length > 0) {
          resolve('Ya existe');
        } else {
          const sql = `insert into ge_matriz_frecuencia 
          (ide_objetivo,ide_perspectiva,ide_frecuencia,abs_rela,crece_decre,meta,linea_base,detalle_linea_base,detalle_meta) 
          values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING ide_matriz;`;
          await this.utilitarioSvc.getConsultaGenerica(sql, [meta, indicador, frecuencia, abs, crece, valor_meta, linea_base, detalle_linea, detalle_meta])
            .subscribe(newProyecto => {
              resolve(newProyecto.datos[0].ide_matriz);
            }, (err) => {
              reject(err);
            })
        }
      }, (err) => {
        reject(err);
      })
    });
  }

  async verificoUsuarioResponsable() {
    const ide_segsuc = localStorage.getItem('ide_segusu') || -1;
    const sql = 'select ide_responsable from ge_responsable where ide_segusu=$1';
    // console.log(ide_segsuc);
    return new Promise(async (resolve, reject) => {
      await this.utilitarioSvc.getConsultaGenerica(sql, [ide_segsuc]).subscribe( res => {
        if(res.datos.length > 0){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    })
  }

  permisos(objetivo) {
    const ide_segsuc = localStorage.getItem('ide_segusu') || -1;
    return new Promise(async (resolve, reject) => {
      const sql = `select registra_proyecto, registra_variacion 
      from ge_objetivo_responsable a, ge_responsable b 
      where  a.ide_responsable=b.ide_responsable and ide_objetivo=$1 and ide_segusu=$2`;
      await this.utilitarioSvc.getConsultaGenerica(sql, [objetivo, ide_segsuc]).subscribe(async project => {
        if (project.datos.length > 0) {
          resolve(project.datos);
        }
      }, (err) => {
        reject(err);
      })
    });
  }


  getReporte() {
    const body = {};
    return this.http.post<any>(`${this.api}/gerencialpdot/getPrintReporte`, body).pipe(
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

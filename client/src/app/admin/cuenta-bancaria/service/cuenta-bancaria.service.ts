import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitarioService } from 'ngprime-core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  provincias = 24;
  api = environment.API_URL;
  constructor(
    private http: HttpClient,
    private utilitarioSvc: UtilitarioService) { }

  getClienteCuenta(persona: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const sql = `select ide_cuban as value, numero_cuban ||' - '|| detalle_batcb as label
      from ban_cuenta_bancaria a, ban_tipo_cuenta_bancaria b
      where a.ide_batcb=b.ide_batcb and activo_cuban=true and ide_perso= $1`;
      await this.utilitarioSvc.getConsultaGenerica(sql, [persona]).subscribe(async project => {
        resolve(project.datos[0]);
      }, (err) => {
        reject(err);
      });
    });
  }

  validarDocumento(tipo: number, cedula: string): boolean {
    let correcto = false;
    if (tipo === 1) {
      correcto = this.validarCedula(cedula);
      if (!correcto) {
        this.utilitarioSvc.agregarMensajeAdvertencia('Número de <strong>CEDULA</strong> es incorrecto, ingrese uno válido.');
      }
    } else if (tipo === 2) {
      correcto = this.validarRucPersonaNatural(cedula);
      if (!correcto) {
        correcto = this.validarRucSociedadPrivada(cedula);
      }
      if (!correcto) {
        correcto = this.validarRucPublica(cedula);
      }
      if (!correcto) {
        this.utilitarioSvc.agregarMensajeAdvertencia('Número de <strong>RUC</strong> es incorrecto, ingrese uno válido.');
      }
    } else {
      correcto = true;
    }
    return correcto;
  }

  private validarCedula(cedula: string): boolean {
    let valido = false;
    if (!cedula || cedula.length !== 10) {
      return false;
    }
    const prov = parseInt(cedula.substring(0, 2), 10);
    if (!(prov > 0 && prov <= this.provincias)) {
      return false;
    }

    const d = [];

    // console.log('longuitud de d ', d.length);
    for (let i = 0; i < 10; i++) {
      d[i] = parseInt(cedula.charAt(i) + '', 10);
    }

    let imp = 0;
    let par = 0;

    for (let i = 0; i < d.length; i += 2) {
      d[i] = ((d[i] * 2) > 9) ? ((d[i] * 2) - 9) : (d[i] * 2);
      imp += d[i];
    }

    for (let i = 1; i < (d.length - 1); i += 2) {
      par += d[i];
    }
    const suma = imp + par;
    const sum: string = suma + 10 + '';
    const sumastring = sum;
    let d10 = parseInt(sumastring.substring(0, 1) + '0', 10) - suma;
    d10 = (d10 === 10) ? 0 : d10;
    valido = d10 === d[9];
    return valido;
  }

  private validarRucPersonaNatural(cedula: string): boolean {
    let valido = false;
    if (!cedula || cedula.length !== 13) {
      return false;
    }
    if (!cedula.endsWith('001')) {
      return false;
    }
    const prov = parseInt(cedula.substring(0, 2), 10);
    if (!(prov > 0 && prov <= this.provincias)) {
      return false;
    }
    const d = [];

    // console.log('longuitud de d ', d.length);
    for (let i = 0; i < 10; i++) {
      d[i] = parseInt(cedula.charAt(i) + '', 10);
    }

    let imp = 0;
    let par = 0;

    for (let i = 0; i < d.length; i += 2) {
      d[i] = ((d[i] * 2) > 9) ? ((d[i] * 2) - 9) : (d[i] * 2);
      imp += d[i];
    }

    for (let i = 1; i < (d.length - 1); i += 2) {
      par += d[i];
    }
    const suma = imp + par;
    const sum: string = suma + 10 + '';
    const sumastring = sum;
    let d10 = parseInt(sumastring.substring(0, 1) + '0', 10) - suma;
    d10 = (d10 === 10) ? 0 : d10;
    valido = d10 === d[9];
    return valido;
  }

  private validarRucSociedadPrivada(ruc: string): boolean {

    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    const constante = 11;
    let respDato = false;
    const prov = parseInt(ruc.substring(0, 2), 10);
    if (!(prov > 0 && prov <= this.provincias)) {
      return false;
    }
    const d = [];
    let suma = 0;
    for (let i = 0; i < d.length; i++) {
      d[i] = parseInt(ruc.charAt(i) + '', 10);
    }
    for (let i = 0; i < d.length - 1; i++) {
      d[i] = d[i] * coeficientes[i];
      suma += d[i];
    }
    let aux = 0;
    let resp = 0;

    aux = suma % constante;
    resp = constante - aux;

    resp = (aux === 0) ? 0 : resp;

    respDato = resp === d[9];
    return respDato;
  }

  private validarRucPublica(ruc: string): boolean {
    let resp = false;
    const prov = parseInt(ruc.substring(0, 2), 10);
    if (!(prov > 0 && prov <= this.provincias)) {
      return false;
    }
    let v1: number;
    let v2: number;
    let v3: number;
    let v4: number;
    let v5: number;
    let v6: number;
    let v7: number;
    let v8: number;
    let v9: number;
    let sumatoria: number;
    let modulo: number;
    let digito: number;
    const d = [];
    for (let i = 0; i < ruc.length; i++) {
      d[i] = parseInt(ruc.charAt(i) + '', 10);
    }
    v1 = d[0] * 3;
    v2 = d[1] * 2;
    v3 = d[2] * 7;
    v4 = d[3] * 6;
    v5 = d[4] * 5;
    v6 = d[5] * 4;
    v7 = d[6] * 3;
    v8 = d[7] * 2;
    v9 = d[8];
    sumatoria = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
    modulo = sumatoria % 11;
    if (modulo === 0) {
      return true;
    }
    digito = 11 - modulo;

    resp = digito === v9;
    return resp;
  }

  async verificoPermiso(): Promise<unknown> {
    const usuario = localStorage.getItem('ide_segusu') || -1;
    const sql = `select a.ide_perso,a.ide_bacaj,ide_segusu,detalle_bacaj,nombre_perso
    from ban_empleado a, ban_caja b,ban_persona c
    where a.ide_bacaj=b.ide_bacaj and a.ide_perso=c.ide_perso
    and ide_segusu=$1 and activo_baemp=true`;
    // console.log(ide_segsuc);
    return new Promise(async (resolve, reject) => {
      await this.utilitarioSvc.getConsultaGenerica(sql, [usuario]).subscribe(res => {
        if (res.datos.length > 0) {
          resolve(res.datos[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  getTicket(): any {
    const body = {};
    return this.http.post<any>(`${this.api}/banco/getTicket`, body).pipe(
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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'ngprime-core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // valido la ruta activa 
    // console.log('valido ruta activa');
    if (this.authSvc.isActiveRoute(state.url)) {
      // valido la vida del token
      const minuto = this.authSvc.getMinutoToken();
      // console.log('valido token', minuto);
      if (this.authSvc.getMinutoToken() > 0 && minuto < 5) {
        // console.log('renuevo token');
        return this.authSvc.renewToken().pipe(
          tap(renovado => {
            // console.log(renovado);
            if (!renovado) {
               this.authSvc.logout();
            }
          })
        )
      } else if (minuto <= 0) {
        // console.log('token caducado');
        this.authSvc.mensajeSesionCaducado('Se ha terminado la sección por inactividad en el sistema');
        return false;
      } else {
        // console.log('aun no renuevo token');
        // console.log('usuario loguueado', this.authSvc.userLogueado());
        return true;
      }
    } else {
      // console.log('no tengo ruta almacenada');
      this.authSvc.logout();
      return false;
    }
  }

}

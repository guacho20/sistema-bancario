import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, UtilitarioService } from 'projects/ngprime-core/src/public-api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DestruirSesionGuard implements CanDeactivate<unknown> {

  constructor(private authSvc: AuthService, private utilitarioSvc: UtilitarioService) { }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authSvc.isMenu) {
      // console.log('soy menu');
      this.authSvc.isMenu = false;
      return true;
    } else {
      // console.log('no soy menu');
      return this.authSvc.cerrarSesion().pipe(
        tap( estaAutenticado =>  {
          this.utilitarioSvc.cerrarLoading();
        })
      );;
    }
  }
  
}

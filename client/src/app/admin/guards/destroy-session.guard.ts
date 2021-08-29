import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, UtilitarioService } from 'ngprime-core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DestroySessionGuard implements CanDeactivate<unknown> {

  constructor(private authSvc: AuthService, private utilitarioSvc: UtilitarioService) { }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authSvc.isMenu) {
      this.authSvc.isMenu = false;
      return true;
    } else {
      this.utilitarioSvc.abrirLoading();
      return this.authSvc.cerrarSesion().pipe(
        tap(estaAutenticado => {
          this.utilitarioSvc.cerrarLoading();
        })
      );
    }
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'projects/ngprime-core/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProteccionGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // valido la ruta activa 
    if (this.authSvc.isActiveRoute(state.url)) {
      if (this.authSvc.validateToken()) {
        if (this.authSvc.isAccessScreen(state.url)) {
          return true;
        }
      }
    } else {
      this.authSvc.logout();
      return false;
    }
    /*  const ruta = state.url.substring(state.url.indexOf('/', 1) + 1, state.url.length);
    if (this.authSvc.getRuta() === ruta) {
      console.log('paso');
      if(this.authSvc.isAutentificado()){
        return true;
      }
    } else {
      console.log('no puede pasar');
      return false;
    }*/
  }

}

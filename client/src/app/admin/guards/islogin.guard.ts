import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'ngprime-core';

@Injectable({
  providedIn: 'root'
})
export class IsloginGuard implements CanActivate {

  constructor(private authSvc: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authSvc.isLogin();
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CuentaBancariaService } from '../service/cuenta-bancaria.service';

@Injectable({
    providedIn: 'root'
})
export class PermisoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    // tslint:disable-next-line:variable-name
    constructor(private _activityService: CuentaBancariaService) {
    }

    /**
     * Resolve
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this._activityService.verificoPermiso();
    }
}

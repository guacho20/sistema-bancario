import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GerencialpdotService } from '../services/gerencialpdot.service';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _activityService: GerencialpdotService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this._activityService.verificoUsuarioResponsable();
    }
}

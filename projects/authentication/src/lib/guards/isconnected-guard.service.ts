import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import debug from 'debug';

import { map, catchError } from 'rxjs/operators';
import { IState, ISession } from '../store/models';
import { sessionActions } from '../store/reducers/session';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockAuthApiService } from '../forgerock-auth-api/forgerock-auth-api.service';
import { ForgerockMessagesService } from '@forgerock/openbanking-ngx-common/services/forgerock-messages';

const log = debug('IsConnectedGuard');

@Injectable({
  providedIn: 'root'
})
export abstract class IsConnectedGuard implements CanActivate {
  constructor(
    protected api: ForgerockAuthApiService,
    protected router: Router,
    protected store: Store<IState>,
    protected configService: ForgerockConfigService,
    protected messages: ForgerockMessagesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<boolean> | boolean {
    log('canActivate', route, state);
    return this.api.getSession().pipe(
      map(this.success.bind(this, route, state)),
      catchError(this.error.bind(this, route, state))
    );
  }

  abstract success(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, session: ISession): boolean;
  abstract error(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, e: HttpErrorResponse): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class IsConnectedPrivateGuard extends IsConnectedGuard {
  success(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, session: ISession) {
    log('IsConnectedPublicGuard success', route, state, session);
    this.store.dispatch(sessionActions.sessionSuccess(session));
    return true;
  }

  error(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    log('IsConnectedPublicGuard error', route, state);
    const options: NavigationExtras = {
      queryParams: {
        returnUrl: encodeURIComponent(state.url)
      }
    };
    this.store.dispatch(sessionActions.sessionError());
    this.router.navigate(['/login'], options);
    return of(false);
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsConnectedPublicGuard extends IsConnectedGuard {
  success(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, session: ISession) {
    log('IsConnectedPublicGuard success', route, state, session);
    this.store.dispatch(sessionActions.sessionSuccess(session));
    this.api.loginSuccessRedirection(route.queryParams);
    return false;
  }

  error(route: ActivatedRouteSnapshot) {
    log('IsConnectedPublicGuard error', route);
    this.store.dispatch(sessionActions.sessionError());
    return of(true);
  }
}

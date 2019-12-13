import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import debug from 'debug';

import { ForgerockAuthRedirectOIDCService } from './oidc.service';
import { catchError, map, take } from 'rxjs/operators';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { IOIDCUser, IOIDCModuleState } from './models';
import { selectOIDCConnected, ForgerockOIDCGetUserSuccessAction } from './store/reducers/user';

const log = debug('guards:IsOIDCConnectedGuard');

@Injectable({
  providedIn: 'root'
})
export class IsOIDCConnectedGuard implements CanActivate {
  constructor(
    protected auth: ForgerockAuthRedirectOIDCService,
    protected router: Router,
    protected store: Store<IOIDCModuleState>,
    protected configService: ForgerockConfigService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | any {
    let isConnected;
    this.store
      .pipe(select(selectOIDCConnected))
      .pipe(take(1))
      .subscribe(value => (isConnected = value));
    log('isConnected', state.url, isConnected);

    return isConnected
      ? of(true)
      : this.auth.getUser().pipe(
          map((data: any) => this.success(data)),
          catchError(() => this.error(state))
        );
  }

  success(user: IOIDCUser): boolean {
    log('user', user);
    this.store.dispatch(new ForgerockOIDCGetUserSuccessAction({ user }));
    return true;
  }

  error(state: RouterStateSnapshot): Observable<boolean> {
    log('error');
    this.auth.getAuthRedirection().subscribe(function(data) {
      window.location.href = data.toString();
    });
    return of(false);
  }
}

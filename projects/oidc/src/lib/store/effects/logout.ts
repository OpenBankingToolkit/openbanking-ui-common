import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ForgerockAuthRedirectOIDCService } from '../../oidc.service';
import { ForgerockOIDCLogoutErrorAction, ForgerockOIDCLogoutSuccessAction, OIDCLogoutTypes } from '../reducers/logout';

@Injectable()
export class OIDCLogoutEffects {
  constructor(private auth: ForgerockAuthRedirectOIDCService, private actions$: Actions, private router: Router) {}

  @Effect()
  request$: Observable<Action> = this.actions$.pipe(
    ofType(OIDCLogoutTypes.LOGOUT_REQUEST),
    mergeMap(action =>
      this.auth.logout().pipe(
        map(() => {
          this.router.navigate(['/session-lost']);
          return new ForgerockOIDCLogoutSuccessAction();
        }),
        catchError(() => {
          return of(new ForgerockOIDCLogoutErrorAction());
        })
      )
    )
  );
}

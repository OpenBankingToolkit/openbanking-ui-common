import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { LogoutSuccessAction, LogoutErrorAction, logoutTypes } from '../reducers/logout';
import { ISession } from '../models';

@Injectable()
export class LogoutEffects {
  constructor(private api: ForgerockAuthApiService, private actions$: Actions, private router: Router) {}

  @Effect()
  request$: Observable<Action> = this.actions$.pipe(
    ofType(logoutTypes.LOGOUT_REQUEST),
    mergeMap(action =>
      this.api.logout().pipe(
        map((session: ISession) => {
          this.router.navigate(['/logged-out'], {
            queryParamsHandling: 'preserve'
          });
          return new LogoutSuccessAction();
        }),
        catchError(() => {
          return of(new LogoutErrorAction());
        })
      )
    )
  );
}

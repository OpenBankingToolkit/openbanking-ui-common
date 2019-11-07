import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { sessionActions, sessionTypes } from '../reducers/session';
import { ISession } from '../models';
import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';

@Injectable()
export class SessionEffects {
  constructor(private api: ForgerockAuthApiService, private actions$: Actions) {}

  @Effect()
  request$: Observable<Action> = this.actions$.pipe(
    ofType(sessionTypes.SESSION_REQUEST),
    mergeMap(action =>
      this.api.getSession().pipe(
        map((session: ISession) => sessionActions.sessionSuccess(session)),
        catchError(() => of(sessionActions.sessionError()))
      )
    )
  );
}

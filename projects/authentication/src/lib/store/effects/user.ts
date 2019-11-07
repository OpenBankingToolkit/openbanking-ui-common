import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { userActions, userTypes } from '../reducers/user';
import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { IUser, IAction, IState, ISession } from '../models';
import { selectSession } from '../reducers/session';
import { ForgerockMessagesService } from 'ob-ui-libs/services/forgerock-messages';

@Injectable()
export class UserEffects {
  constructor(
    private api: ForgerockAuthApiService,
    private actions$: Actions,
    private store: Store<IState>,
    private message: ForgerockMessagesService,
    private translate: TranslateService
  ) {}

  @Effect()
  getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(userTypes.USER_GET_REQUEST),
    withLatestFrom(this.store.select(selectSession)),
    mergeMap(([action, session]: [IAction, ISession]) => {
      if (!session) {
        return throwError({
          message: "session is missing, can't get user's profile"
        });
      }
      return this.api.getUserProfile(session.realm, session.username).pipe(
        map((user: IUser) => userActions.userGetSuccess(user)),
        catchError(() => of(userActions.userGetError()))
      );
    })
  );

  @Effect()
  updateProfile$: Observable<Action> = this.actions$.pipe(
    ofType(userTypes.USER_UPDATE_REQUEST),
    withLatestFrom(this.store.select(selectSession)),
    mergeMap(([action, session]: [IAction, ISession]) =>
      this.api.updateUserProfile(session.realm, session.username, action.payload.form).pipe(
        map((user: IUser) => {
          this.message.success(this.translate.instant('PROFILE.UPDATE_SUCCESS'));
          return userActions.userSetSuccess(user);
        }),
        catchError((e: HttpErrorResponse) => {
          this.message.error(e.message || this.translate.instant('PROFILE.UPDATE_ERROR'));
          return of(userActions.userSetError());
        })
      )
    )
  );

  @Effect()
  updatePassword$: Observable<Action> = this.actions$.pipe(
    ofType(userTypes.USER_PASSWORD_REQUEST),
    withLatestFrom(this.store.select(selectSession)),
    mergeMap(([action, session]: [IAction, ISession]) =>
      this.api.updateUserPassword(session.realm, session.username, action.payload.form).pipe(
        map((user: IUser) => {
          this.message.success(this.translate.instant('PROFILE.PASSWORD_UPDATE_SUCCESS'));
          return userActions.userPasswordSuccess();
        }),
        catchError((e: HttpErrorResponse) => {
          this.message.error(e.message || this.translate.instant('PROFILE.PASSWORD_UPDATE_ERROR'));
          return of(userActions.userPasswordError());
        })
      )
    )
  );
}

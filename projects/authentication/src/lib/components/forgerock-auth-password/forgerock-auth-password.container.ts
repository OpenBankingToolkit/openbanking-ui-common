import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { IState, IUser } from '../../store/models';
import { selectUser, userActions, selectIsPasswordSubmitting } from '../../store/reducers/user';
import { ApiRequest } from '../../models';

@Component({
  selector: 'forgerock-auth-password-container',
  template: `
    <ng-container *ngIf="user$ | async as user; else loading">
      <forgerock-auth-profile-container></forgerock-auth-profile-container>
      <forgerock-auth-password
        [user]="user"
        [isLoading]="isLoading$ | async"
        (formSubmit)="formSubmit($event)"
      ></forgerock-auth-password>
    </ng-container>
    <ng-template #loading>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `
})
export class ForgerockAuthPasswordContainer implements OnInit {
  user$: Observable<IUser> = this.store.pipe(select(selectUser));
  isLoading$: Observable<boolean> = this.store.pipe(select(selectIsPasswordSubmitting));

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    let exists;
    this.user$.pipe(first()).subscribe(val => (exists = val));

    if (!exists) {
      this.store.dispatch(userActions.userGetRequest());
    }
  }

  formSubmit(value: ApiRequest.IUserUpdateBody) {
    this.store.dispatch(userActions.userPasswordRequest(value));
  }
}

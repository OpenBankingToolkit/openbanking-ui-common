import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { IState, IUser } from '../../store/models';
import { selectUser, userActions, selectIsUpdateSubmitting } from '../../store/reducers/user';
import { ApiRequest } from '../../models';

@Component({
  selector: 'forgerock-auth-details-container',
  template: `
    <ng-container *ngIf="user$ | async as user; else loading">
      <forgerock-auth-profile-container></forgerock-auth-profile-container>
      <forgerock-auth-details
        [user]="user"
        [isLoading]="isLoading$ | async"
        (formSubmit)="formSubmit($event)"
      ></forgerock-auth-details>
    </ng-container>
    <ng-template #loading>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `
})
export class ForgerockAuthDetailsContainer implements OnInit {
  user$: Observable<IUser> = this.store.pipe(select(selectUser));
  isLoading$: Observable<boolean> = this.store.pipe(select(selectIsUpdateSubmitting));

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    let exists;
    this.user$.pipe(first()).subscribe(val => (exists = val));

    if (!exists) {
      this.store.dispatch(userActions.userGetRequest());
    }
  }

  formSubmit(value: ApiRequest.IUserUpdateBody) {
    this.store.dispatch(userActions.userSetRequest(value));
  }
}

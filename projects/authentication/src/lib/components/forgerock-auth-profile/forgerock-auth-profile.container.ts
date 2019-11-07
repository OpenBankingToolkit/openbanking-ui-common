import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IState } from '../../store/models';
import { selectFullName, selectUsername, userActions } from '../../store/reducers/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'forgerock-auth-profile-container',
  template: `
    <forgerock-auth-profile
      [username]="username$ | async"
      [userFullName]="userFullName$ | async"
    ></forgerock-auth-profile>
  `
})
export class ProfileContainerComponent implements OnInit {
  userFullName$: Observable<string> = this.store.pipe(select(selectFullName));
  username$: Observable<string> = this.store.pipe(select(selectUsername));

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    let exists;
    this.userFullName$.pipe(first()).subscribe(val => (exists = val));

    if (!exists) {
      this.store.dispatch(userActions.userGetRequest());
    }
  }
}

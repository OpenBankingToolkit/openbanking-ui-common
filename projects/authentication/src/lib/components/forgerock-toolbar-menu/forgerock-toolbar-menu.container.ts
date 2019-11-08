import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { LogoutRequestAction } from '../../store/reducers/logout';
import { selectConnected, selectFullName } from '../../store/reducers/user';
import { IState } from '../../store/models';

@Component({
  // tslint:disable-next-line
  selector: 'forgerock-toolbar-menu-container',
  template: `
    <forgerock-toolbar-menu
      [username]="username$ | async"
      [connected]="connected$ | async"
      (logout)="logout($event)"
    ></forgerock-toolbar-menu>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `
  ]
})
export class ForgerockToolbarMenuContainer implements OnInit {
  connected$: Observable<boolean> = this.store.pipe(select(selectConnected));
  username$: Observable<string> = this.store.pipe(select(selectFullName));

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {}

  logout(e: Event) {
    this.store.dispatch(new LogoutRequestAction());
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import _get from 'lodash-es/get';

import { StagesParentComponent } from './stages.parent.component';

@Component({
  selector: 'app-authenticator-redirect',
  template: `
    <h1 *ngIf="response.header">{{ response.header }}</h1>
    <h1 *ngIf="!response.header">
      {{ 'STAGES.' + response.stage + '.TITLE' | translate }}
    </h1>
    <p>Redirecting...</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorRedirectComponent extends StagesParentComponent implements OnInit, OnDestroy {
  polling: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
    const RedirectCallback = this.response.callbacks.find(callback => callback.type === 'RedirectCallback');
    const redirectUrl = _get(RedirectCallback, 'output[0].value');
    window.location.href = redirectUrl;
  }

  ngOnDestroy(): void {}
}

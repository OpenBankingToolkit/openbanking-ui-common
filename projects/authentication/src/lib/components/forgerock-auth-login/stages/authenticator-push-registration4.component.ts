import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import _get from 'lodash-es/get';

import { StagesParentComponent } from './stages.parent.component';

const INTERVAL_POLLING = 20000;

@Component({
  selector: 'app-authenticator-push-registration4',
  template: `
    <h1 *ngIf="response.header">{{ response.header }}</h1>
    <h1 *ngIf="!response.header">
      {{ 'STAGES.' + response.stage + '.TITLE' | translate }}
    </h1>
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <ng-container *ngFor="let field of response.callbacks" dynamicField [config]="field" [group]="formGroup">
      </ng-container>
      <div class="footer" fxLayout="row" fxLayoutAlign="center center">
        <mat-spinner color="accent" diameter="15"></mat-spinner>
        <p>{{ 'STAGES.' + response.stage + '.LOADING' | translate }}</p>
      </div>
    </form>
  `,
  styles: [
    `
      .footer {
        margin-top: 0;
      }
      .footer p {
        margin-left: 15px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorPushRegistration4Component extends StagesParentComponent implements OnInit, OnDestroy {
  polling: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
    const PollingWaitCallback = this.response.callbacks.find(callback => callback.type === 'PollingWaitCallback');
    const intervalMs = _get(PollingWaitCallback, 'output[0].value', INTERVAL_POLLING);
    this.polling = interval(intervalMs).subscribe(() => this.submit());
  }

  ngOnDestroy(): void {
    this.polling.unsubscribe();
  }
}

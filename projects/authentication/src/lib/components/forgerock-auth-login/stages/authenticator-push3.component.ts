import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import _get from 'lodash-es/get';

import { StagesParentComponent } from './stages.parent.component';

const INTERVAL_POLLING = 20000;

@Component({
  selector: 'app-authenticator-push3',
  template: `
    <h1 *ngIf="response.header">{{ response.header }}</h1>
    <h1 *ngIf="!response.header">
      {{ 'STAGES.' + response.stage + '.TITLE' | translate }}
    </h1>
    <p>
      {{
        'STAGES.' + response.stage + '.SUBTITLE'
          | translate
            : {
                clientName: client?.name
              }
      }}
    </p>
    <div class="loading-wrapper" fxLayout="row" fxLayoutAlign="center center">
      <mat-spinner color="accent" diameter="40"></mat-spinner>
      <img width="70" src="./assets/images/mobile.svg" />
    </div>
    <p>{{ 'STAGES.' + response.stage + '.LOADING' | translate }}</p>
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <ng-container *ngFor="let field of response.callbacks" dynamicField [config]="field" [group]="formGroup">
      </ng-container>
    </form>
  `,
  styles: [
    `
      mat-spinner {
        position: absolute;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorPush3Component extends StagesParentComponent implements OnInit, OnDestroy {
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

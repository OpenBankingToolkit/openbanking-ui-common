import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { StagesParentComponent } from './stages.parent.component';

@Component({
  selector: 'app-authenticator-push-registration5',
  template: `
    <h1 *ngIf="response.header">{{ response.header }}</h1>
    <h1 *ngIf="!response.header">
      {{ 'STAGES.' + response.stage + '.TITLE' | translate }}
    </h1>
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <ng-container *ngFor="let field of response.callbacks" dynamicField [config]="field" [group]="formGroup">
      </ng-container>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorPushRegistration5Component extends StagesParentComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}

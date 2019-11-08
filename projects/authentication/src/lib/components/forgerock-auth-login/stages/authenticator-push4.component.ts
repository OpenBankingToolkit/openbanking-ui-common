import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { StagesParentComponent } from './stages.parent.component';

@Component({
  selector: 'app-authenticator-push4',
  template: `
    <h1 *ngIf="response.header">{{ response.header }}</h1>
    <h1 *ngIf="!response.header">
      {{ 'STAGES.' + response.stage + '.TITLE' | translate }}
    </h1>
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <ng-container *ngFor="let field of response.callbacks" dynamicField [config]="field" [group]="formGroup">
      </ng-container>
      <div class="footer">
        <p>
          {{ 'STAGES.' + response.stage + '.DONT_HAVE_CODE' | translate }}
          <a [href]="getSanitizedMailto()">{{ 'STAGES.' + response.stage + '.CONTACT' | translate }}</a>
        </p>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorPush4Component extends StagesParentComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getSanitizedMailto(url: string = '') {
    return this.sanitizer.bypassSecurityTrustUrl(`mailto:${this.client.adminContact}`);
  }
}

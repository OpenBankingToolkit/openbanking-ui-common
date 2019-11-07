import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'forgerock-gdpr-denied-page',
  template: `
    <mat-card>
      <mat-card-content>
        <forgerock-customer-logo></forgerock-customer-logo>
        <h2>{{ 'GDPR.TITLE' | translate }}</h2>
        <p>{{ 'GDPR.TEXT' | translate }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        max-width: 500px;
        display: block;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockGDPRPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

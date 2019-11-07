import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  selector: 'app-textoutput-callback',
  template: `
    <div *ngIf="config.output[1].value !== '4'">
      {{ config.output[0].value }}
    </div>
    <div class="qr-wrapper">
      <qrcode [qrdata]="qrcode" [size]="280" [level]="'L'"></qrcode>
    </div>
  `,
  styles: [
    `
      .qr-wrapper {
        padding: 10px;
      }
      .qr-wrapper ::ng-deep img {
        margin: auto;
      }
    `
  ]
})
export class TextOutputCallbackComponent implements Field, OnInit {
  authId: string;
  config: ICallback;
  group: FormGroup;
  qrcode: string;

  constructor() {}

  ngOnInit() {
    const qrcode = this.config.output[0].value.match(`(pushauth:[^']*)`);
    if (qrcode) {
      this.qrcode = qrcode[1];
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  exportAs: 'passwordCallback',
  selector: 'app-password-callback',
  template: `
    <mat-form-field #passwordCallback class="form-password-callback" [formGroup]="group">
      <input
        matInput
        [type]="hide ? 'password' : 'text'"
        [placeholder]="config.output[0].value"
        [formControlName]="config.input[0].name"
        (change)="onChange($event)"
      />
      <mat-icon matSuffix (click)="hide = !hide">{{ hide ? 'visibility' : 'visibility_off' }}</mat-icon>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `
  ]
})
export class PasswordCallbackComponent implements Field, OnInit {
  @ViewChild('passwordCallback', { static: true }) formRef: ElementRef;
  authId: string;
  config: ICallback;
  group: FormGroup;
  hide = true;

  ngOnInit() {
    this.group.get(this.config.input[0].name).setValue(this.config.input[0].value);
  }

  onChange(e) {
    this.config.input[0].value = e.target.value;
  }

  // constructor(private openAMEventService: OpenAMEventService) {
  //   this.openAMEventService.cartData.subscribe(
  //     (data: any) => {
  //       if (data instanceof Unauthorized) {
  //       }
  //     });
  // }
}

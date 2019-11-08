import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  selector: 'app-name-callback',
  template: `
    <mat-form-field class="form-name-callback" [formGroup]="group">
      <input
        matInput
        [placeholder]="config.output[0].value"
        [formControlName]="config.input[0].name"
        [id]="config.input[0].name"
        (change)="onChange($event)"
      />
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
export class NameCallbackComponent implements Field, OnInit {
  authId: string;
  config: ICallback;
  group: FormGroup;

  ngOnInit() {
    this.group.get(this.config.input[0].name).setValue(this.config.input[0].value);
  }

  onChange(e) {
    this.config.input[0].value = e.target.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  selector: 'app-hiddenvalue-callback',
  template: `
    <div class="dynamic-field form-hiddenvalue-callback" [formGroup]="group">
      <input
        programmaticInputFireEvent
        type="hidden"
        [attr.placeholder]="config.output[0].value"
        [formControlName]="config.input[0].name"
        [id]="config.input[0].name"
        (change)="onChange($event)"
      />
    </div>
  `
})
export class HiddenValueCallbackComponent implements Field, OnInit {
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

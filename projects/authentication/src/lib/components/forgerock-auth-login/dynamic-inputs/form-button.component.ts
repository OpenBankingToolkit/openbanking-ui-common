import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  selector: 'app-form-button',
  template: `
    <section class="form-button" [formGroup]="group">
      <button mat-flat-button color="primary" [disabled]="!group.valid" type="submit">
        {{ config.output[0].value }}
      </button>
    </section>
  `
})
export class FormButtonComponent implements Field {
  authId: string;
  config: ICallback;
  group: FormGroup;
}

import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiReponses } from '../../../models';
import { IConfigClient } from '../../../models';

export class StagesParentComponent implements OnInit {
  constructor() {}

  @Input() response: ApiReponses.AuthLoginResponse;
  @Input() client: IConfigClient;
  @Output() formSubmit = new EventEmitter<any>();

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({});
    if (this.response.authId) {
      this.response.callbacks
        .filter(({ type }) => type !== 'button')
        .forEach(control => this.formGroup.addControl(this.getName(control), this.createControl(control)));
    }
  }

  getName(item: any) {
    let name = item.input && item.input[0].name;
    if (!name) {
      name = item.output && item.output[0].name;
    }
    return name;
  }

  createControl(config: any) {
    const value = this.getName(config);
    return new FormControl(value, [Validators.required]);
  }

  submit() {
    this.formSubmit.emit(this.response);
  }
}

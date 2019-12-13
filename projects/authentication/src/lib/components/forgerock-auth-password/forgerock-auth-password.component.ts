import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import _get from 'lodash-es/get';

import { IUser } from '../../store/models';
import { ApiRequest } from '../../models';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';

export const RegistrationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const repeatPassword = control.get('repeatPassword');

  if (repeatPassword.value.length <= 0) {
    return null;
  }

  if (repeatPassword.value !== newPassword.value) {
    return {
      doesMatchPassword: true
    };
  }

  return null;
};

@Component({
  selector: 'forgerock-auth-password',
  templateUrl: './forgerock-auth-password.component.html',
  styleUrls: ['./forgerock-auth-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockAuthPasswordComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  isDisabled: boolean = this.configService.get('featureFlags.disablePasswordForm', false);
  @Input() user: IUser;
  @Input() isLoading = false;
  @Output() formSubmit = new EventEmitter<ApiRequest.IUserPasswordUpdateBody>();

  constructor(private configService: ForgerockConfigService) {}

  ngOnInit() {
    this.formGroup = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.minLength(8), Validators.required]),
        newPassword: new FormControl('', [Validators.minLength(8), Validators.required]),
        repeatPassword: new FormControl('', [Validators.minLength(8), Validators.required])
      },
      {
        validators: RegistrationValidator
      }
    );

    if (this.isDisabled) {
      this.formGroup.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isDisabled && changes.isLoading && !changes.isLoading.firstChange) {
      changes.isLoading.currentValue ? this.formGroup.disable() : this.formGroup.enable();
    }
  }

  submit() {
    if (this.isDisabled) {
      return;
    }
    const username = _get(this.user, 'username', '');

    this.formSubmit.emit({
      currentpassword: this.formGroup.value.currentPassword,
      userpassword: this.formGroup.value.newPassword,
      username
    });
  }
}

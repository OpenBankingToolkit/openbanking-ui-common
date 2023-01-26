import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { retry } from 'rxjs/operators';

import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';
import { ForgerockMessagesService } from '@forgerock/openbanking-ngx-common/services/forgerock-messages';
import { ForgerockConfirmDialogComponent } from '@forgerock/openbanking-ngx-common/components/forgerock-confirm-dialog';
import { withErrorHandling } from '@forgerock/openbanking-ngx-common/utils';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';

function validateLowercase(c: FormControl) {
  return c.value && c.value === c.value.toLowerCase()
    ? null
    : {
        lowercase: {
          valid: false
        }
      };
}

@Component({
  selector: 'forgerock-auth-register',
  templateUrl: './forgerock-auth-register.component.html',
  styleUrls: ['./forgerock-auth-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockAuthRegisterComponent implements OnInit {
  formGroup: FormGroup;
  disableRegistration: boolean = this.configService.get('featureFlags.disableRegistration', false);

  constructor(
    private api: ForgerockAuthApiService,
    private messages: ForgerockMessagesService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ForgerockConfigService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.minLength(6), Validators.required]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        // At least 8 characters in length; Lowercase letters; Uppercase letters; Numbers; Special characters
        Validators.minLength(8),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required
      ]),
      consent: new FormControl(false, Validators.required)
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.formGroup.dirty) {
      return true;
    }
    const dialogRef = this.dialog.open(ForgerockConfirmDialogComponent, {
      data: {
        text: this.translate.instant('REGISTER.FORM_CONFIRM')
      }
    });
    return dialogRef.afterClosed();
  }

  onSubmit() {
    const { realm } = this.route.snapshot.queryParams;
    this.formGroup.disable();

    this.api
      .register(realm, this.formGroup.value)
      .pipe(retry(3), withErrorHandling)
      .subscribe(
        data => {
          this.messages.success(this.translate.instant('REGISTER.SUCCESS'));
          this.formGroup.reset();
          this.router.navigate(['/login'], {
            queryParamsHandling: 'preserve'
          });
        },
        error => {
          this.formGroup.enable();
          this.messages.error(error.message);
        }
      );
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslateModule } from '@ngx-translate/core';

import { ForgerockAuthRegisterComponent } from './forgerock-auth-register.component';
import { CanDeactivateGuard } from '@forgerock/openbanking-ngx-common/guards';
import { ForgerockConfirmDialogModule } from '@forgerock/openbanking-ngx-common/components/forgerock-confirm-dialog';
import { ForgerockCustomerLogoModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ForgerockConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ForgerockCustomerLogoModule
  ],
  declarations: [ForgerockAuthRegisterComponent],
  providers: [CanDeactivateGuard]
})
export class ForgerockAuthRegisterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ForgerockAuthLoginComponent } from './forgerock-auth-login.component';
import { LoginDynamicStagesModule } from './stages/stages.module';
import { ForgerockMessagesModule } from 'ob-ui-libs/services/forgerock-messages';
import { ForgerockAuthApiModule } from '../../forgerock-auth-api/forgerock-auth-api.module';
import { ForgerockConfigModule } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockCustomerLogoModule } from 'ob-ui-libs/components/forgerock-customer-logo';

export const ngModuleConfig = {
  imports: [
    CommonModule,
    TranslateModule,
    LoginDynamicStagesModule,
    CookieModule.forRoot(),
    MatCardModule,
    MatProgressBarModule,
    ForgerockMessagesModule,
    ForgerockAuthApiModule,
    ForgerockConfigModule,
    ForgerockCustomerLogoModule
  ],
  exports: [ForgerockAuthLoginComponent],
  declarations: [ForgerockAuthLoginComponent]
};

@NgModule(ngModuleConfig)
export class ForgerockAuthLoginModule {}

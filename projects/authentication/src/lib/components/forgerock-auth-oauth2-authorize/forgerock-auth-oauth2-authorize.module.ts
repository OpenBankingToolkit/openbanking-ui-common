import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ForgerockMessagesModule } from 'ob-ui-libs/services/forgerock-messages';
import { ForgerockAuthApiModule } from '../../forgerock-auth-api/forgerock-auth-api.module';
import { ForgerockConfigModule } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockCustomerLogoModule } from 'ob-ui-libs/components/forgerock-customer-logo';
import { ForgerockAlertModule } from 'ob-ui-libs/components/forgerock-alert';
import { ForgerockAuthOauth2AuthorizeComponent } from './forgerock-auth-oauth2-authorize.component';
import { ForgerockAuthOauth2AuthorizeRoutingModule } from './forgerock-auth-oauth2-authorize.routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CookieModule.forRoot(),
    MatCardModule,
    MatProgressBarModule,
    HttpClientModule,
    ForgerockMessagesModule,
    ForgerockAuthApiModule,
    ForgerockConfigModule,
    ForgerockCustomerLogoModule,
    ForgerockAlertModule,
    ForgerockAuthOauth2AuthorizeRoutingModule
  ],
  exports: [ForgerockAuthOauth2AuthorizeComponent],
  declarations: [ForgerockAuthOauth2AuthorizeComponent]
})
export class ForgerockAuthOauth2AuthorizeModule {}

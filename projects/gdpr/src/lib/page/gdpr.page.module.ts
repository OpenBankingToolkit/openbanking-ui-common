import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

import { ForgerockGDPRPageComponent } from './gdpr.page.component';
import { ForgerockGDPRPageRoutingModule } from './gdpr.page.routing.module';
import { ForgerockCustomerLogoModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';

@NgModule({
  imports: [CommonModule, MatCardModule, TranslateModule, ForgerockCustomerLogoModule, ForgerockGDPRPageRoutingModule],
  declarations: [ForgerockGDPRPageComponent]
})
export class ForgerockGDPRPageModule {}

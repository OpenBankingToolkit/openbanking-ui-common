import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ForgerockCustomerLogoComponent } from './forgerock-customer-logo.component';
import { ForgerockConfigModule } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockCustomerSVGModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-svg';

@NgModule({
  imports: [CommonModule, StoreModule, ForgerockConfigModule, ForgerockCustomerSVGModule],
  declarations: [ForgerockCustomerLogoComponent],
  exports: [ForgerockCustomerLogoComponent]
})
export class ForgerockCustomerLogoModule {}

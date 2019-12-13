import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgerockConfigModule } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { StoreModule } from '@ngrx/store';
import { ForgerockCustomerSVGComponent } from './forgerock-customer-svg.component';

@NgModule({
  imports: [CommonModule, StoreModule, ForgerockConfigModule],
  declarations: [ForgerockCustomerSVGComponent],
  exports: [ForgerockCustomerSVGComponent]
})
export class ForgerockCustomerSVGModule {}

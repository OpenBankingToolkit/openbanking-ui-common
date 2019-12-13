import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ForgerockCustomerIconComponent } from './forgerock-customer-icon.component';
import { ForgerockConfigModule } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockCustomerSVGModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-svg';

@NgModule({
  imports: [CommonModule, StoreModule, ForgerockConfigModule, ForgerockCustomerSVGModule],
  declarations: [ForgerockCustomerIconComponent],
  exports: [ForgerockCustomerIconComponent]
})
export class ForgerockCustomerIconModule {}

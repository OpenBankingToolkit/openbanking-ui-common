import { NgModule } from '@angular/core';

import { ForgerockCustomerIconModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-icon';
import { ForgerockCustomerLogoModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';
import { ForgerockAlertModule } from '@forgerock/openbanking-ngx-common/components/forgerock-alert';

@NgModule({
  imports: [ForgerockCustomerIconModule, ForgerockCustomerLogoModule, ForgerockAlertModule],
  exports: [ForgerockCustomerIconModule, ForgerockCustomerLogoModule, ForgerockAlertModule]
})
export class ForgerockSharedComponentsModule {}

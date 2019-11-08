import { NgModule } from '@angular/core';

import { ForgerockCustomerIconModule } from 'ob-ui-libs/components/forgerock-customer-icon';
import { ForgerockCustomerLogoModule } from 'ob-ui-libs/components/forgerock-customer-logo';
import { ForgerockAlertModule } from 'ob-ui-libs/components/forgerock-alert';

@NgModule({
  imports: [ForgerockCustomerIconModule, ForgerockCustomerLogoModule, ForgerockAlertModule],
  exports: [ForgerockCustomerIconModule, ForgerockCustomerLogoModule, ForgerockAlertModule]
})
export class ForgerockSharedComponentsModule {}

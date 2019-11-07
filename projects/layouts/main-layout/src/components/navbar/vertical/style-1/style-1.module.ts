import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NavbarVerticalStyle1Component } from './style-1.component';
import { ForgerockMainLayoutNavigationModule } from '../../../../navigation/navigation.module';
import { ForgerockMainLayoutSharedModule } from '../../../../shared.module';
import { ForgerockCustomerIconModule } from 'ob-ui-libs/components/forgerock-customer-icon';

@NgModule({
  declarations: [NavbarVerticalStyle1Component],
  imports: [
    ForgerockMainLayoutSharedModule,
    MatButtonModule,
    MatIconModule,
    ForgerockMainLayoutNavigationModule,
    ForgerockCustomerIconModule
  ],
  exports: [NavbarVerticalStyle1Component]
})
export class NavbarVerticalStyle1Module {}

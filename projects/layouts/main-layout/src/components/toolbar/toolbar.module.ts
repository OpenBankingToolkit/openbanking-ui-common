import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToolbarComponent } from './toolbar.component';
import { ForgerockMainLayoutSharedModule } from '../../shared.module';
import { ForgerockCustomerIconModule } from 'ob-ui-libs/components/forgerock-customer-icon';
import { LayoutContainerModule } from '../container/container.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    ForgerockMainLayoutSharedModule,
    LayoutContainerModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    ForgerockCustomerIconModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}

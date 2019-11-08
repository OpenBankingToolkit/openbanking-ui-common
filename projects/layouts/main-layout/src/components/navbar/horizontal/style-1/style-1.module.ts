import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NavbarHorizontalStyle1Component } from './style-1.component';
import { ForgerockMainLayoutNavigationModule } from '../../../../navigation/navigation.module';
import { ForgerockMainLayoutSharedModule } from '../../../../shared.module';
import { LayoutContainerModule } from '../../../container/container.module';

@NgModule({
  declarations: [NavbarHorizontalStyle1Component],
  imports: [
    ForgerockMainLayoutSharedModule,
    MatButtonModule,
    LayoutContainerModule,
    MatIconModule,
    ForgerockMainLayoutNavigationModule
  ],
  exports: [NavbarHorizontalStyle1Component]
})
export class NavbarHorizontalStyle1Module {}

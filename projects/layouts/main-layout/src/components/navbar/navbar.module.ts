import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { NavbarHorizontalStyle1Module } from './horizontal/style-1/style-1.module';
import { NavbarVerticalStyle1Module } from './vertical/style-1/style-1.module';
import { ForgerockMainLayoutSharedModule } from '../../shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [ForgerockMainLayoutSharedModule, NavbarHorizontalStyle1Module, NavbarVerticalStyle1Module],
  exports: [NavbarComponent]
})
export class NavbarModule {}

import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ContentModule } from '../../components/content/content.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

import { HorizontalLayout1Component } from './layout-1.component';
import { ForgerockMainLayoutSharedModule } from '../../shared.module';

@NgModule({
  declarations: [HorizontalLayout1Component],
  imports: [
    ForgerockMainLayoutSharedModule,
    MatSidenavModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    ToolbarModule
  ],
  exports: [HorizontalLayout1Component]
})
export class HorizontalLayout1Module {}

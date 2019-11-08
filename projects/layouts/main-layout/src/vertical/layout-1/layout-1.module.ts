import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentModule } from '../../components/content/content.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

import { VerticalLayout1Component } from './layout-1.component';
import { ForgerockMainLayoutSharedModule } from '../../shared.module';

@NgModule({
  declarations: [VerticalLayout1Component],
  imports: [ForgerockMainLayoutSharedModule, RouterModule, ContentModule, FooterModule, NavbarModule, ToolbarModule],
  exports: [VerticalLayout1Component]
})
export class VerticalLayout1Module {}

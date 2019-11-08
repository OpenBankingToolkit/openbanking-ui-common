import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  ForgerockMainLayoutConfigToken,
  ForgerockMainLayoutNavigationsToken,
  ForgerockMainLayoutComponentsToken
} from './tokens';
import { ForgerockMainLayoutComponent } from './main-layout.component';
import { VerticalLayout1Module } from './vertical/layout-1/layout-1.module';
import { HorizontalLayout1Module } from './horizontal/layout-1/layout-1.module';
import { ForgerockMainLayoutSharedModule } from './shared.module';
import { IForgerockMainLayoutConfig, IForgerockMainLayoutComponents, IForgerockMainLayoutNavigations } from './models';

export interface ForgerockMainLayoutConfig {
  layout: IForgerockMainLayoutConfig;
  navigations: IForgerockMainLayoutNavigations;
  components?: IForgerockMainLayoutComponents;
}

@NgModule({
  imports: [ForgerockMainLayoutSharedModule, VerticalLayout1Module, HorizontalLayout1Module],
  declarations: [ForgerockMainLayoutComponent],
  exports: [],
  providers: []
})
export class ForgerockMainLayoutModule {
  static forRoot(config: ForgerockMainLayoutConfig): ModuleWithProviders {
    return {
      ngModule: ForgerockMainLayoutModule,
      providers: [
        { provide: ForgerockMainLayoutConfigToken, useValue: config.layout },
        {
          provide: ForgerockMainLayoutNavigationsToken,
          useValue: config.navigations
        },
        {
          provide: ForgerockMainLayoutComponentsToken,
          useValue: config.components || {}
        }
      ]
    };
  }
}

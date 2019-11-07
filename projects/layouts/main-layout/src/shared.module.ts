import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { ForgerockLayoutSidebarComponent } from './sidebar/sidebar.component';
import { ForgerockMainLayoutConfigService } from './main-layout.config.service';
import { ForgerockLayoutSidebarService } from './sidebar/sidebar.service';
import { ForgerockMainLayoutNavigationService } from './navigation/navigation.service';

@NgModule({
  declarations: [ForgerockLayoutSidebarComponent],
  imports: [CommonModule, FlexLayoutModule, TranslateModule],
  exports: [CommonModule, FlexLayoutModule, ForgerockLayoutSidebarComponent, TranslateModule],
  providers: [ForgerockMainLayoutConfigService, ForgerockLayoutSidebarService, ForgerockMainLayoutNavigationService]
})
export class ForgerockMainLayoutSharedModule {}

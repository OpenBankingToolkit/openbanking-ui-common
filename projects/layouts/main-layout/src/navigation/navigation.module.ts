import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';

import { ForgerockMainLayoutNavigationComponent } from './navigation.component';
import { FuseNavVerticalItemComponent } from './vertical/item/item.component';
import { FuseNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { FuseNavVerticalGroupComponent } from './vertical/group/group.component';
import { FuseNavHorizontalItemComponent } from './horizontal/item/item.component';
import { FuseNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
import { ForgerockMainLayoutSharedModule } from '../shared.module';

@NgModule({
  imports: [ForgerockMainLayoutSharedModule, RouterModule, MatIconModule, MatRippleModule, TranslateModule.forChild()],
  exports: [ForgerockMainLayoutNavigationComponent],
  declarations: [
    ForgerockMainLayoutNavigationComponent,
    FuseNavVerticalGroupComponent,
    FuseNavVerticalItemComponent,
    FuseNavVerticalCollapsableComponent,
    FuseNavHorizontalItemComponent,
    FuseNavHorizontalCollapsableComponent
  ]
})
export class ForgerockMainLayoutNavigationModule {}

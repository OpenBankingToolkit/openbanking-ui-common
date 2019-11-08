import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { ProfileContainerComponent } from './forgerock-auth-profile.container';
import { ProfileComponent } from './forgerock-auth-profile.component';
import { ForgerockSharedModule } from 'ob-ui-libs/shared';

@NgModule({
  imports: [CommonModule, StoreModule, RouterModule, FlexLayoutModule, TranslateModule, ForgerockSharedModule],
  declarations: [ProfileComponent, ProfileContainerComponent],
  exports: [ProfileComponent, ProfileContainerComponent]
})
export class ForgerockAuthProfileModule {}

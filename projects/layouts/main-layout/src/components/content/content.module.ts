import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import { ForgerockMainLayoutSharedModule } from '../../shared.module';
import { LayoutContainerModule } from '../container/container.module';

@NgModule({
  declarations: [ContentComponent],
  imports: [ForgerockMainLayoutSharedModule, RouterModule, LayoutContainerModule],
  exports: [ContentComponent]
})
export class ContentModule {}

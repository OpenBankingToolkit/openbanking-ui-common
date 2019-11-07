import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgerockSplitFlapComponent } from './forgerock-splitflap.component';
import { ForgerockSplitFlapCharacterComponent } from './forgerock-splitflap-character.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ForgerockSplitFlapComponent, ForgerockSplitFlapCharacterComponent],
  exports: [ForgerockSplitFlapComponent, ForgerockSplitFlapCharacterComponent]
})
export class ForgerockSplitFlapModule {}

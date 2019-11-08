import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateFormatPipe } from './forgerock-date-format.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DateFormatPipe],
  exports: [DateFormatPipe],
  providers: [DateFormatPipe]
})
export class ForgerockPipesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgerockChartComponent } from './forgerock-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ForgerockChartComponent],
  exports: [ForgerockChartComponent]
})
export class ForgerockChartModule {}

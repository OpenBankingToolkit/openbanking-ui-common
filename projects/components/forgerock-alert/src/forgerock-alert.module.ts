import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgerockAlertComponent } from './forgerock-alert.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ForgerockAlertComponent],
  exports: [ForgerockAlertComponent]
})
export class ForgerockAlertModule {}

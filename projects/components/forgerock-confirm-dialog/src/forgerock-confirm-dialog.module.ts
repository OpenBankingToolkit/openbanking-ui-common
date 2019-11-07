import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ForgerockConfirmDialogComponent } from './forgerock-confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [ForgerockConfirmDialogComponent],
  entryComponents: [ForgerockConfirmDialogComponent],
  exports: [MatDialogModule, MatButtonModule]
})
export class ForgerockConfirmDialogModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ForgerockMessagesService } from './forgerock-messages.service';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [],
  providers: [ForgerockMessagesService]
})
export class ForgerockMessagesModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FooterComponent } from './footer.component';
import { ForgerockMainLayoutSharedModule } from '../../shared.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [ForgerockMainLayoutSharedModule, RouterModule, MatButtonModule, MatIconModule, MatToolbarModule],
  exports: [FooterComponent]
})
export class FooterModule {}

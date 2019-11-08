import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PDFLayoutComponent } from './pdf.component';

@NgModule({
  declarations: [PDFLayoutComponent],
  imports: [RouterModule],
  exports: [PDFLayoutComponent]
})
export class ForgerockPDFLayoutModule {}

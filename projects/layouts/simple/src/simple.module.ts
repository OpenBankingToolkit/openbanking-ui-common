import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SimpleLayoutComponent } from './simple.component';

@NgModule({
  declarations: [SimpleLayoutComponent],
  imports: [RouterModule, TranslateModule],
  exports: [SimpleLayoutComponent, TranslateModule]
})
export class ForgerockSimpleLayoutModule {}

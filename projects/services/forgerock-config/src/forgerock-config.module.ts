import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ForgerockConfigService } from './forgerock-config.service';

@NgModule({
  imports: [HttpClientModule]
})
export class ForgerockConfigModule {
  static forRoot() {
    // include in appModule only
    return {
      ngModule: ForgerockConfigModule,
      providers: [ForgerockConfigService]
    };
  }
}

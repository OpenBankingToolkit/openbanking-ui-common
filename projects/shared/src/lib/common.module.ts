import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ForgerockPipesModule } from 'ob-ui-libs/pipes';
import { ForgerockMessagesModule } from 'ob-ui-libs/services/forgerock-messages';
import { ForgerockConfigModule } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockSharedComponentsModule } from './components.module';
import { ForgerockSplashscreenModule } from 'ob-ui-libs/services/forgerock-splashscreen';
import { ForgerockCustomerCanAccessGuard } from 'ob-ui-libs/guards';
import { ForgerockGDPRModule } from 'ob-ui-libs/gdpr';

@NgModule({
  imports: [
    ForgerockPipesModule,
    ForgerockMessagesModule,
    ForgerockConfigModule,
    ForgerockSharedComponentsModule,
    ForgerockSplashscreenModule,
    ForgerockGDPRModule,
    TranslateModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    ForgerockPipesModule,
    ForgerockMessagesModule,
    ForgerockConfigModule,
    ForgerockSharedComponentsModule,
    ForgerockSplashscreenModule,
    ForgerockGDPRModule,
    TranslateModule,
    FlexLayoutModule,
    RouterModule
  ],
  providers: [ForgerockCustomerCanAccessGuard]
})
export class ForgerockSharedModule {}

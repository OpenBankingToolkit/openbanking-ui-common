import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ForgerockPipesModule } from '@forgerock/openbanking-ngx-common/pipes';
import { ForgerockMessagesModule } from '@forgerock/openbanking-ngx-common/services/forgerock-messages';
import { ForgerockConfigModule } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockSharedComponentsModule } from './components.module';
import { ForgerockSplashscreenModule } from '@forgerock/openbanking-ngx-common/services/forgerock-splashscreen';
import { ForgerockCustomerCanAccessGuard } from '@forgerock/openbanking-ngx-common/guards';
import { ForgerockGDPRModule } from '@forgerock/openbanking-ngx-common/gdpr';

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

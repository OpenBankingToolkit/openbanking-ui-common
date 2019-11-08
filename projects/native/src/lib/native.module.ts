import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgerockNativeSplashscreenService } from './services/splashcreen.service';
import { ForgerockNativeDeepLinkService } from './services/deeplink.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [ForgerockNativeSplashscreenService, ForgerockNativeDeepLinkService]
})
export class ForgerockNativeModule {}

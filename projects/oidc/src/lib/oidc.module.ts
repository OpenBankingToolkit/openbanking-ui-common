import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoreModule } from '@ngrx/store';

import { ForgerockAuthRedirectOIDCComponent } from './oidc.component';
import { ForgerockAuthRedirectOIDCService } from './oidc.service';
import { ForgerockOIDCConfigToken, ForgerockOIDCReducersToken } from './tokens';
import {
  ForgerockConfigService,
  ForgerockConfigModule
} from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockAlertModule } from '@forgerock/openbanking-ngx-common/components/forgerock-alert';
import userReducer from './store/reducers/user';
import { ForgerockOIDCRootEffects } from './store/effects/index';
import { provideBootstrapEffects } from '@forgerock/openbanking-ngx-common/utils';
import { IsOIDCConnectedGuard } from './oidc.guard.service';

export interface ForgerockOIDCConfig {
  backendURL: string;
}

export type ForgerockOIDCConfigFactory = (config: ForgerockConfigService) => ForgerockOIDCConfig;

export function getReducers() {
  return {
    user: userReducer
  };
}

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    ForgerockAlertModule,
    ForgerockConfigModule,
    StoreModule.forFeature('oidc', ForgerockOIDCReducersToken)
  ],
  declarations: [ForgerockAuthRedirectOIDCComponent],
  exports: [ForgerockAuthRedirectOIDCComponent],
  providers: [
    {
      provide: ForgerockOIDCReducersToken,
      deps: [],
      useFactory: getReducers
    },
    ForgerockAuthRedirectOIDCService,
    provideBootstrapEffects(ForgerockOIDCRootEffects),
    IsOIDCConnectedGuard
  ]
})
export class ForgerockOIDCModule {
  static forRoot(factory: ForgerockOIDCConfigFactory): ModuleWithProviders {
    return {
      ngModule: ForgerockOIDCModule,
      providers: [
        {
          provide: ForgerockOIDCConfigToken,
          useFactory: factory,
          deps: [ForgerockConfigService]
        }
      ]
    };
  }
}

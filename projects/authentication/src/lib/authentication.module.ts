import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import userReducer from './store/reducers/user';
import sessionReducer from './store/reducers/session';
import { ForgerockAuthProfileModule } from './components/forgerock-auth-profile/forgerock-auth-profile.module';
import { ForgerockAuthRegisterModule } from './components/forgerock-auth-register/forgerock-auth-register.module';
import { ForgerockAuthLoginModule } from './components/forgerock-auth-login/forgerock-auth-login.module';
import { ForgerockAuthenticationRootEffects } from './store/effects/index';

export interface ForgerockAuthenticationConfig {
  api: string;
}

export type ForgerockAuthenticationFactory = () => ForgerockAuthenticationConfig;

export const AUTH_REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<any>>('authenticationReducers');

export function getAuthReducers() {
  return {
    user: userReducer,
    session: sessionReducer
  };
}

@NgModule({
  imports: [
    CommonModule,
    ForgerockAuthRegisterModule,
    ForgerockAuthLoginModule,
    ForgerockAuthProfileModule,
    StoreModule.forFeature('authentication', AUTH_REDUCERS_TOKEN),
    EffectsModule.forRoot(ForgerockAuthenticationRootEffects)
    // EffectsModule.forFeature(ForgerockAuthenticationRootEffects)
  ],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: AUTH_REDUCERS_TOKEN,
      deps: [],
      useFactory: getAuthReducers
    }
  ]
})
export class ForgerockAuthenticationModule {
  static forRoot(config?: ForgerockAuthenticationFactory) {
    return {
      ngModule: ForgerockAuthenticationModule,
      providers: []
    };
  }
}

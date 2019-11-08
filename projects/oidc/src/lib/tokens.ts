import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const ForgerockOIDCConfigToken = new InjectionToken('ForgerockOIDCConfigToken');
export const ForgerockOIDCReducersToken = new InjectionToken<ActionReducerMap<any>>('ForgerockOIDCReducersToken');

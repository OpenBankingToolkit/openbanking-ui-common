import { Action } from '@ngrx/store';

export const OIDCLogoutTypes = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR'
};

export class ForgerockOIDCLogoutRequestAction implements Action {
  readonly type = OIDCLogoutTypes.LOGOUT_REQUEST;
}

export class ForgerockOIDCLogoutSuccessAction implements Action {
  readonly type = OIDCLogoutTypes.LOGOUT_SUCCESS;
}

export class ForgerockOIDCLogoutErrorAction implements Action {
  readonly type = OIDCLogoutTypes.LOGOUT_ERROR;
}

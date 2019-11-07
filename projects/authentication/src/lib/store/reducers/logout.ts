import { Action } from '@ngrx/store';

export const logoutTypes = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR'
};

export class LogoutRequestAction implements Action {
  readonly type = logoutTypes.LOGOUT_REQUEST;
}

export class LogoutSuccessAction implements Action {
  readonly type = logoutTypes.LOGOUT_SUCCESS;
}

export class LogoutErrorAction implements Action {
  readonly type = logoutTypes.LOGOUT_ERROR;
}

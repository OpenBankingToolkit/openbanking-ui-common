import { Action } from '@ngrx/store';
import { IOIDCModuleState, IOIDCUser, IOIDCUserState } from '../../models';
import _get from 'lodash-es/get';

import { OIDCLogoutTypes } from './logout';

export const OIDCUserTypes = {
  USER_GET_REQUEST: 'USER_GET_REQUEST',
  USER_GET_SUCCESS: 'USER_GET_SUCCESS',
  USER_GET_ERROR: 'USER_GET_ERROR'
};

export class ForgerockOIDCGetUserRequestAction implements Action {
  readonly type = OIDCUserTypes.USER_GET_REQUEST;
}

export class ForgerockOIDCGetUserSuccessAction implements Action {
  readonly type = OIDCUserTypes.USER_GET_SUCCESS;
  constructor(public payload: { user: IOIDCUser }) {}
}

export class ForgerockOIDCGetUserErrorAction implements Action {
  readonly type = OIDCUserTypes.USER_GET_ERROR;
}

export type ActionsUnion =
  | ForgerockOIDCGetUserRequestAction
  | ForgerockOIDCGetUserSuccessAction
  | ForgerockOIDCGetUserErrorAction;

export const DEFAULT_STATE: IOIDCUserState = {
  isFetching: false,
  user: null
};

export default function userReducer(state: IOIDCUserState = DEFAULT_STATE, action: any): IOIDCUserState {
  switch (action.type) {
    case OIDCUserTypes.USER_GET_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case OIDCUserTypes.USER_GET_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        user: action.payload.user
      };
    }
    case OIDCUserTypes.USER_GET_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case OIDCLogoutTypes.LOGOUT_ERROR:
    case OIDCLogoutTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        isFetching: false
      };
    }
    default:
      return state;
  }
}

export const selectOIDCConnected = (state: IOIDCModuleState) => _get(state.oidc, 'user.user', null) !== null;
export const selectOIDCUser = (state: IOIDCModuleState) => _get(state.oidc, 'user.user');
export const selectOIDCUserId = (state: IOIDCModuleState) => _get(state.oidc, 'user.user.id');
export const selectOIDCDirectoryId = (state: IOIDCModuleState) => _get(state.oidc, 'user.user.directoryID');
export const selectOIDCUserOrganisationId = (state: IOIDCModuleState) => _get(state.oidc, 'user.user.organisationId');
export const selectOIDCUserAuthorities = (state: IOIDCModuleState) => _get(state.oidc, 'user.user.authorities', []);

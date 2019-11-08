import { createSelector } from '@ngrx/store';
import _get from 'lodash-es/get';

import { IUserState, IUser, IAction, IState } from '../models';
import { ApiRequest } from '../../models';

export const userTypes = {
  USER_GET_REQUEST: 'USER_GET_REQUEST',
  USER_GET_SUCCESS: 'USER_GET_SUCCESS',
  USER_GET_ERROR: 'USER_GET_ERROR',
  USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
  USER_UPDATE_ERROR: 'USER_UPDATE_ERROR',
  USER_PASSWORD_REQUEST: 'USER_PASSWORD_REQUEST',
  USER_PASSWORD_SUCCESS: 'USER_PASSWORD_SUCCESS',
  USER_PASSWORD_ERROR: 'USER_PASSWORD_ERROR'
};

export const userActions = {
  userGetRequest: (): IAction => ({ type: userTypes.USER_GET_REQUEST }),
  userGetSuccess: (user: IUser): IAction => ({
    type: userTypes.USER_GET_SUCCESS,
    payload: { user }
  }),
  userGetError: (): IAction => ({ type: userTypes.USER_GET_ERROR }),
  userSetRequest: (form: ApiRequest.IUserUpdateBody): IAction => ({
    type: userTypes.USER_UPDATE_REQUEST,
    payload: { form }
  }),
  userSetSuccess: (user: IUser): IAction => ({
    type: userTypes.USER_UPDATE_SUCCESS,
    payload: { user }
  }),
  userSetError: (): IAction => ({ type: userTypes.USER_UPDATE_ERROR }),
  userPasswordRequest: (form: ApiRequest.IUserUpdateBody): IAction => ({
    type: userTypes.USER_PASSWORD_REQUEST,
    payload: { form }
  }),
  userPasswordSuccess: (): IAction => ({ type: userTypes.USER_PASSWORD_SUCCESS }),
  userPasswordError: (): IAction => ({ type: userTypes.USER_PASSWORD_ERROR })
};

const DEFAULT_STATE: IUserState = {
  isFetching: false,
  isUpdateSubmitting: false,
  isPasswordSubmitting: false,
  user: null
};

export default function userReducer(state: IUserState = DEFAULT_STATE, action: IAction): IUserState {
  switch (action.type) {
    case userTypes.USER_GET_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case userTypes.USER_UPDATE_REQUEST: {
      return {
        ...state,
        isUpdateSubmitting: true
      };
    }
    case userTypes.USER_PASSWORD_REQUEST: {
      return {
        ...state,
        isPasswordSubmitting: true
      };
    }
    case userTypes.USER_GET_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        user: action.payload.user
      };
    }
    case userTypes.USER_UPDATE_SUCCESS: {
      return {
        ...state,
        isUpdateSubmitting: false,
        user: action.payload.user
      };
    }
    case userTypes.USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordSubmitting: false
      };
    }
    case userTypes.USER_GET_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case userTypes.USER_UPDATE_ERROR: {
      return {
        ...state,
        isUpdateSubmitting: false
      };
    }
    case userTypes.USER_PASSWORD_ERROR: {
      return {
        ...state,
        isPasswordSubmitting: false
      };
    }

    default:
      return state;
  }
}

export const selectConnected = (state: IState) => _get(state.authentication, 'user.user', null) !== null;
export const selectUser = (state: IState) => _get(state.authentication, 'user.user');
export const selectIsFetching = (state: IState) => _get(state.authentication, 'user.isFetching');
export const selectIsUpdateSubmitting = (state: IState) => _get(state.authentication, 'user.isUpdateSubmitting');
export const selectIsPasswordSubmitting = (state: IState) => _get(state.authentication, 'user.isPasswordSubmitting');
export const selectId = (state: IState) => _get(state.authentication, 'user.user.id', '');
export const selectUsername = (state: IState) => _get(state.authentication, 'user.user.username', '');
export const selectFirstName = (state: IState) => _get(state.authentication, 'user.user.givenName[0]', '');
export const selectLastName = (state: IState) => _get(state.authentication, 'user.user.sn[0]', '');

export const selectFullName = createSelector(
  selectFirstName,
  selectLastName,
  (firstname: string, lastname: string) => {
    return `${firstname} ${lastname}`;
  }
);

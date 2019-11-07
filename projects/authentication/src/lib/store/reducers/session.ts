import { ISessionState, ISession, IAction, IState } from '../models';
import _get from 'lodash-es/get';

export const sessionTypes = {
  SESSION_REQUEST: 'SESSION_REQUEST',
  SESSION_SUCCESS: 'SESSION_SUCCESS',
  SESSION_ERROR: 'SESSION_ERROR'
};

export const sessionActions = {
  sessionRequest: (): IAction => ({ type: sessionTypes.SESSION_REQUEST }),
  sessionSuccess: (session: ISession): IAction => ({
    type: sessionTypes.SESSION_SUCCESS,
    payload: { session }
  }),
  sessionError: (): IAction => ({ type: sessionTypes.SESSION_ERROR })
};

const DEFAULT_STATE: ISessionState = {
  loading: false,
  session: null
};

export default function sessionReducer(state: ISessionState = DEFAULT_STATE, action: IAction): ISessionState {
  switch (action.type) {
    case sessionTypes.SESSION_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case sessionTypes.SESSION_SUCCESS: {
      return {
        ...state,
        loading: false,
        session: action.payload.session
      };
    }
    case sessionTypes.SESSION_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
}

export const selectSession = (state: IState) => _get(state.authentication, 'session.session');
export const selectLoading = (state: IState) => _get(state.authentication, 'session.loading');

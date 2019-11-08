import { IUserState } from './user';
import { ISessionState } from './session';

export * from './user';
export * from './session';

export interface IAction {
  type: string;
  payload?: {
    [key: string]: any;
  };
}

export interface IState {
  authentication: {
    user: IUserState;
    session: ISessionState;
  };
}

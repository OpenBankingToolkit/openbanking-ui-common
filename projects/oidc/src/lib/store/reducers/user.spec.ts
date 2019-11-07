import userReducer, {
  DEFAULT_STATE,
  ForgerockOIDCGetUserRequestAction,
  ForgerockOIDCGetUserSuccessAction,
  ForgerockOIDCGetUserErrorAction
} from './user';
import { ForgerockOIDCLogoutSuccessAction, ForgerockOIDCLogoutErrorAction } from './logout';
import { IOIDCUser } from '../../models';

describe('userReducer', () => {
  it('should return the default state', () => {
    const action = {};
    const state = userReducer(undefined, action);

    expect(state).toBe(DEFAULT_STATE);
  });

  it('should return the default state if action type does not match', () => {
    const action = { type: 'whatever' };
    const state = userReducer(undefined, action);

    expect(state).toBe(DEFAULT_STATE);
  });

  it('GetUserRequestAction should set isFetching to true', () => {
    let state = userReducer(DEFAULT_STATE, {});

    expect(state.isFetching).toEqual(false);

    state = userReducer(state, new ForgerockOIDCGetUserRequestAction());

    expect(state.isFetching).toEqual(true);
  });

  it('GetUserSuccessAction should set isFetching to true', () => {
    const user: IOIDCUser = {
      id: '12345',
      organisationId: 'test'
    };
    let state = userReducer(DEFAULT_STATE, {});

    state = userReducer(state, new ForgerockOIDCGetUserRequestAction());

    expect(state.isFetching).toEqual(true);

    state = userReducer(state, new ForgerockOIDCGetUserSuccessAction({ user }));

    expect(state).toEqual({
      isFetching: false,
      user
    });
  });

  it('GetUserErrorAction should set isFetching to false', () => {
    let state = userReducer(DEFAULT_STATE, {});

    state = userReducer(state, new ForgerockOIDCGetUserRequestAction());

    expect(state.isFetching).toEqual(true);

    state = userReducer(state, new ForgerockOIDCGetUserErrorAction());

    expect(state.isFetching).toEqual(false);
  });

  it('LogoutSuccessAction should reset the state', () => {
    const user: IOIDCUser = {
      id: '12345',
      organisationId: 'test'
    };
    let state = userReducer(DEFAULT_STATE, {});

    state = userReducer(state, new ForgerockOIDCGetUserRequestAction());
    state = userReducer(state, new ForgerockOIDCGetUserSuccessAction({ user }));
    state = userReducer(state, new ForgerockOIDCLogoutSuccessAction());

    expect(state).toEqual(DEFAULT_STATE);
  });

  it('LogoutErrorAction should reset the state', () => {
    const user: IOIDCUser = {
      id: '12345',
      organisationId: 'test'
    };
    let state = userReducer(DEFAULT_STATE, {});

    state = userReducer(state, new ForgerockOIDCGetUserRequestAction());
    state = userReducer(state, new ForgerockOIDCGetUserSuccessAction({ user }));
    state = userReducer(state, new ForgerockOIDCLogoutErrorAction());

    expect(state).toEqual(DEFAULT_STATE);
  });
});

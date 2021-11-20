import { AuthTypes, AuthActions } from './Types';
import { authReducer, createAuthInitialState } from './Reducers';
import { UserMock } from '../../mocks/User.mock';

const initialAuthState = createAuthInitialState();

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as AuthActions)).toEqual(initialAuthState);
  });

  it('should handle AUTH_SUCCESS', () => {
    const state = { ...initialAuthState, login: true, loading: false };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.AUTH_SUCCESS,
      })
    ).toEqual(state);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const state = { ...initialAuthState, login: false, loginWithoutCompany: false };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.LOGOUT_SUCCESS,
      })
    ).toEqual(state);
  });

  it('should handle AUTH_START', () => {
    const state = { ...initialAuthState, loading: true };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.AUTH_START,
      })
    ).toEqual(state);
  });

  it('should handle USER_SET', () => {
    const user = UserMock.getUserInfo();
    user.currentEnvironment = [];
    const state = { ...initialAuthState, user };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.USER_SET,
        user,
      })
    ).toEqual(state);
  });

  it('should handle LOGIN_WITHOUT_COMPANY', () => {
    const state = { ...initialAuthState, loginWithoutCompany: true, loading: false };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.LOGIN_WITHOUT_COMPANY,
      })
    ).toEqual(state);
  });

  it('should handle AUTH_ERROR', () => {
    const state = { ...initialAuthState, error: 'Something went wrong', loading: false };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.AUTH_ERROR,
        error: 'Something went wrong',
      })
    ).toEqual(state);
  });
});

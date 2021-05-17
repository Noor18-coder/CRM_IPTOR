/** Authentication Action Types */

import { Action } from 'redux';
import { UserItem } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum AuthTypes {
  LOGIN_WITHOUT_COMPANY = 'LOGIN_WITHOUT_COMPANY',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_START = 'AUTH_START',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  USER_SET = 'USER_SET',
  AUTH_ERROR = 'AUTH_ERROR'
}

export interface AuthRequest {
    user: string;
    password: string;
    company?: string;
  }
  
/** Authentication success action */
export interface AuthWithoutCompany extends Action<AuthTypes.LOGIN_WITHOUT_COMPANY> {}

/** Authentication success action */
export interface AuthSuccessAction extends Action<AuthTypes.AUTH_SUCCESS> {}

/** Authentication stated action */
export interface AuthStartAction extends Action<AuthTypes.AUTH_START> {}

/** Logout success action */
export interface LogoutSuccessAction extends Action<AuthTypes.LOGOUT_SUCCESS> {}

/** Logout success action */
export interface AuthServiceErrorAction extends Action<AuthTypes.AUTH_ERROR> {}

/** User set action */
export interface UserSetAction extends Action<AuthTypes.USER_SET> {
  user: UserItem
}

/** Authentication action union, mainly used in reducer */
export type AuthActions = 
  AuthSuccessAction | 
  AuthStartAction | 
  LogoutSuccessAction | 
  UserSetAction |
  AuthWithoutCompany |
  AuthServiceErrorAction;

/** Authentication state definition */
export interface AuthState {
  readonly loginWithoutCompany: boolean;
  readonly login: boolean;
  readonly loading: boolean;
  readonly error: boolean;
  readonly user: UserItem;
}

/** Authentication Action Types */

import { Action } from 'redux';
import { UserItem } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum UserActionTypes {
  SAVE_USERS = 'SAVE_USERS',
}

/** Authentication success action */
export interface SaveUserAction extends Action<UserActionTypes.SAVE_USERS> {
  users: UserItem[];
}

export type OpportunityActions = SaveUserAction;

/** Authentication state definition */
export interface UsersData {
  readonly users: UserItem[];
}

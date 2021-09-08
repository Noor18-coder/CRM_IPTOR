/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { UserActionTypes, SaveUserAction, UsersData } from './Types';

/**
 * Initial State
 */
export const createUsersData = (): UsersData => {
  return {
    users: [],
  };
};

const initialState = createUsersData();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const usersReducer: Reducer<UsersData, SaveUserAction> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SAVE_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

export default usersReducer;

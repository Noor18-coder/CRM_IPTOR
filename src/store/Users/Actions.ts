/**
 * Opportunity Actions and Middleware definition
*/
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserItem } from '../../helpers/Api/models';
import { User } from '../../helpers/Api/User';
import { UserActionTypes, UsersData, SaveUserAction } from './Types';

/** Action to set auth state logged in status */
export const saveUsers: ActionCreator<SaveUserAction> = (users: UserItem[]) => {
  return {
    type: UserActionTypes.SAVE_USERS,
    users: users
  };
};



export const getUsersInfo: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<SaveUserAction>,
  // The type for the data within the last action
  UserItem[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  SaveUserAction
>> = (freeTextSearch: string, limit?: number, offset?: number) => {
  return async (dispatch: Dispatch) => {
    const usersInfo = await User.getAll(freeTextSearch, offset, limit);
    const data = usersInfo;
    return dispatch(saveUsers(data));
  }

};

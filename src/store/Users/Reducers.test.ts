import { UserActionTypes, SaveUserAction } from './Types';
import usersReducer, { createUsersData } from './Reducers';
import { UserMock } from '../../mocks/User.mock';

const initialUsersState = createUsersData();

describe('Users Reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {} as SaveUserAction)).toEqual(initialUsersState);
  });

  it('should handle SAVE_USERS', () => {
    const users = UserMock.getUsers(1);
    const state = { ...initialUsersState, users };
    expect(
      usersReducer(initialUsersState, {
        type: UserActionTypes.SAVE_USERS,
        users,
      })
    ).toEqual(state);
  });
});

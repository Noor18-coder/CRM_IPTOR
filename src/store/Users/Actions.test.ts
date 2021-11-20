import axios from 'axios';
import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { UsersStoreType } from '../../mocks/Store.mock';
import { UserMock } from '../../mocks/User.mock';
import { User } from '../../helpers/Api/User';

let store: UsersStoreType;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Users Actions', () => {
  beforeAll(() => {
    store = StoreMock.createUsersStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as UsersStoreType;
  });

  it('should create an action to SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS', () => {
    const users = UserMock.getUsers(1);
    const expectedAction = [
      {
        type: types.UserActionTypes.SAVE_USERS,
        users,
      },
    ];
    store.dispatch(actions.saveUsers(users));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Users Thunk Actions', () => {
  beforeAll(() => {
    store = StoreMock.createUsersStore();
  });

  afterEach(() => {
    mockedAxios.post.mockClear();
    mockedAxios.get.mockClear();
    store.clearActions();
  });

  afterAll(() => {
    store = {} as UsersStoreType;
  });

  it('should get business partners', async () => {
    const users = UserMock.getUsers(1);

    jest.spyOn(User, 'getAll').mockResolvedValueOnce(users);

    const expectedAction = [
      {
        type: types.UserActionTypes.SAVE_USERS,
        users,
      },
    ];

    await store.dispatch<any>(actions.getUsersInfo('search'));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

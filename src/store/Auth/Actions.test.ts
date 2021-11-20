/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-test-prefixes */
import axios from 'axios';
import { User, CompanyInfo } from '../../helpers/Api';
import * as apiModels from '../../helpers/Api/models';
import * as types from './Types';
import * as actions from './Actions';
import { AppLoadingTypes } from '../InitialConfiguration/Types';

import StoreMock, { AuthStoreType } from '../../mocks/Store.mock';
import { UserMock } from '../../mocks/User.mock';
import { CompanyInfoMock } from '../../mocks/CompanyInfo.mock';

let store: AuthStoreType;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const authRequest: types.AuthRequest = {
  user: 'someuser',
  password: 'somepassword',
  company: 'somecompany',
};

describe('Auth Actions', () => {
  beforeAll(() => {
    store = StoreMock.createAuthStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as AuthStoreType;
  });

  it('should create an action to AUTH_SUCCESS', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_SUCCESS,
      },
    ];
    store.dispatch(actions.authSuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to AUTH_START', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START,
      },
    ];
    store.dispatch(actions.authStart());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to LOGIN_WITHOUT_COMPANY', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.LOGIN_WITHOUT_COMPANY,
      },
    ];
    store.dispatch(actions.loginWithoutCompanySuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to LOGOUT_SUCCESS', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.LOGOUT_SUCCESS,
      },
    ];
    store.dispatch(actions.logOutSuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to AUTH_ERROR', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_ERROR,
        error: 'some error',
      },
    ];
    store.dispatch(actions.authServiceFailure('some error'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to USER_SET', () => {
    const user = UserMock.getUserInfo();
    const expectedAction = [
      {
        type: types.AuthTypes.USER_SET,
        user,
      },
    ];
    store.dispatch(actions.setUserInfo(user));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Auth Thunk Actions', () => {
  beforeAll(() => {
    store = StoreMock.createAuthStore();
  });

  afterEach(() => {
    mockedAxios.post.mockClear();
    mockedAxios.get.mockClear();
    store.clearActions();
  });

  afterAll(() => {
    store = {} as AuthStoreType;
  });

  it('should not authenticate user', async () => {
    const expectedAction = [
      {
        type: AppLoadingTypes.SET_LOADING_MASK,
      },
      {
        type: types.AuthTypes.AUTH_START,
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS,
      },
      {
        type: AppLoadingTypes.REMOVE_LOADING_MASK,
      },
      {
        type: types.AuthTypes.AUTH_ERROR,
        error: 'Something went wrong',
      },
    ];

    await store.dispatch<any>(actions.authentication(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should not authenticate user and throw message from API', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { data: { error: { details: 'custom error message' } } } });
    const expectedAction = [
      {
        type: AppLoadingTypes.SET_LOADING_MASK,
      },
      {
        type: types.AuthTypes.AUTH_START,
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS,
      },
      {
        type: AppLoadingTypes.REMOVE_LOADING_MASK,
      },
      {
        type: types.AuthTypes.AUTH_ERROR,
        error: 'custom error message',
      },
    ];

    await store.dispatch<any>(actions.authentication(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should authenticate user', async () => {
    const userProfile = UserMock.getUserInfo();
    const company = CompanyInfoMock.getCompanyInfoItem();
    const currentEnvironment = company.items.map((obj: apiModels.CompanyInfoItem) => {
      return { ...obj, selected: false };
    });
    const profile = { user: '', handler: userProfile.user, text: userProfile.text, description: '', selectedCompany: '', currentEnvironment };

    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    jest.spyOn(User, 'getUserProfile').mockResolvedValueOnce(userProfile);
    jest.spyOn(CompanyInfo, 'get').mockResolvedValueOnce(company);

    const expectedAction = [
      {
        type: AppLoadingTypes.SET_LOADING_MASK,
      },
      {
        type: types.AuthTypes.AUTH_START,
      },
      {
        type: types.AuthTypes.USER_SET,
        user: profile,
      },
      {
        type: AppLoadingTypes.REMOVE_LOADING_MASK,
      },
      {
        type: types.AuthTypes.LOGIN_WITHOUT_COMPANY,
      },
    ];

    await store.dispatch<any>(actions.authentication(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

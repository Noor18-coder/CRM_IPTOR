import * as actions from './Actions';
import * as types from './Types';
import axios from 'axios';
import { AuthRequest } from './Types';

import { AnyAction } from 'redux'; // Or your own Action definition
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AppState } from './../store';
import { createAuthInitialState } from './Reducers';

//Extension needed for iniect AppState to async redux thunk actions
type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;

const initialState = {
  auth: createAuthInitialState()
} as AppState;

const middleware = [thunk];
const mockStore = createMockStore<AppState, DispatchExts>(middleware);
let store = {} as MockStoreEnhanced<AppState, DispatchExts>;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const authRequest: AuthRequest = {
  user: 'someuser',
  password: 'somepassword',
  company: 'somecompany'
};

describe('AuthActions', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  
  afterEach(() => {
    mockedAxios.post.mockClear();
    mockedAxios.get.mockClear();
    store = {} as MockStoreEnhanced<AppState, DispatchExts>;
  });

  it('should create an action to auth success', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_SUCCESS
      }
    ];
    store.dispatch(actions.authSuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to auth start', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      }
    ];
    store.dispatch(actions.authStart());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to auth logout success', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];
    store.dispatch(actions.logOutSuccess());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create AUTH_SUCCESS action when isLogin is set to true', async () => {
    const modifiedState = { 
      auth: {
        ...initialState.auth,
        login: true
      } 
    } as AppState;
    store = mockStore(modifiedState)

    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.auth(authRequest));
    actions.authCheckState();
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create AUTH_SUCCESS action when login api returns 200', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ url: '/api/login', config: {data: {user: "janusz"}}, data: {}, status: 200 }));
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({data: {data: 'janusz'}}));
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: {}}));

    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.auth(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenNthCalledWith(1,'/api/login', authRequest);
  });

    it('should create AUTH_SUCCESS action when login api returns 200', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ url: '/api/service', data : {data: {items: []}}, status: 200 }));
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({data: {data:{ items : []}}}));
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: {}}));

    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.USER_SET,
        user: { currentEnvironment: []}
      },
      {
        type: types.AuthTypes.LOGIN_WITHOUT_COMPANY,
      }
    ];

    await store.dispatch<any>(actions.auth(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenNthCalledWith(1,'/api/login', authRequest);
  });

  it('should create LOGOUT_SUCCESS action when login api not returns 200', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.authWithCompany(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/login', authRequest);
  });

  
 
  it('should create LOGOUT_SUCCESS action when login api failes', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error('Failes to fetch data')));
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.auth(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/login', authRequest);
  });

  
  it('should create LOGOUT_SUCCESS action when login with company api failes', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error('Failes to fetch data')));
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.authWithCompany(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/login', authRequest);
  });

  it('should create AUTH_SUCCESS action when login api returns 200', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ url: '/api/service', data : {data: {items: []}}, status: 200 }));
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({data: {data:{}}}));
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: {}}));

    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_START
      },
      {
        type: types.AuthTypes.LOGOUT_SUCCESS,
      }
    ];

    await store.dispatch<any>(actions.authWithCompany(authRequest));
    expect(store.getActions()).toEqual(expectedAction);
    
    expect(mockedAxios.post).toHaveBeenNthCalledWith(1,'/api/login', authRequest);
  });



  it('should create LOGOUT_SUCCESS actions on logOut', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));

    const expectedAction = [
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.logOut());
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/logout');
  });

  it('should create LOGOUT_SUCCESS actions on logOut if api fails', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error('Failes to fetch data')));

    const expectedAction = [
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.logOut());
    expect(store.getActions()).toEqual(expectedAction);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/logout');
  });

  it('should create AUTH_SUCCESS actions on authCheckState', async () => {
    const modifiedState = { 
      auth: {
        ...initialState.auth,
        login: true
      } 
    } as AppState;
    store = mockStore(modifiedState)
    const expectedAction = [
      {
        type: types.AuthTypes.AUTH_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.authCheckState());
    actions.authCheckState();
    expect(store.getActions()).toEqual(expectedAction);
  });

  
  it('should create LOGOUT_SUCCESS actions on authCheckState', async () => {
    const modifiedState = { 
      auth: {
        ...initialState.auth,
        login: false
      } 
    } as AppState;
    store = mockStore(modifiedState)
    const expectedAction = [
      {
        type: types.AuthTypes.LOGOUT_SUCCESS
      }
    ];

    await store.dispatch<any>(actions.authCheckState());
    actions.authCheckState();
    expect(store.getActions()).toEqual(expectedAction);
  }); 
  it('should create an action to auth start', () => {
    const expectedAction = [
      {
        type: types.AuthTypes.USER_SET
      }
    ];
    store.dispatch(actions.setUserInfo());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action while login with company', () => {
    const expectedAction = [
        {
          type: types.AuthTypes.AUTH_SUCCESS
        }
      ];
    store.dispatch(actions.authSuccess());
     expect(store.getActions()).toEqual(expectedAction);
  });
});

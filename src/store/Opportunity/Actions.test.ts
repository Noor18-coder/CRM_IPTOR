//import configureStore from 'redux-mock-store';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
//import * as actions from './Type';
import { addOpportunity } from './Actions';
  import { AnyAction } from 'redux';
// import fetch from 'node-fetch';

import {OpportunityTypes , OpportunityActions, OpportunityState, Opportunity , OpportunityAdd } from './Types';

//jest.mock('node-fetch', () => jest.fn());

//const initialState = {};
const state:OpportunityState =  {
    opportunities:[]
};
const middlewares = [thunk];
// const mockStore = configureStore<OpportunityState, any, AnyAction >(middlewares);
// const store = mockStore(State);

import configureStore, { MockStore } from "redux-mock-store";
const mockStore = configureStore(middlewares);
const store = mockStore(state); 

describe('action creators', () => {
  describe('#loadCurrentUser', () => {
    afterEach(() => {
      store.clearActions();
    });
    it('load current user success', async () => {
    //   const userMocked = { userId: 1 };
    //   (fetch as jest.MockedFunction<any>).mockResolvedValueOnce({
    //     ok: true,
    //     json: jest.fn().mockResolvedValueOnce(userMocked)
    //   });

    const oppty : Opportunity = {
        id: '1234567',
        company: 'Serum',
        dealSize: '$32K',
        status: 'Closed-Lost'
    }

    
      await store.dispatch(addOpportunity(oppty));
     // expect(fetch).toBeCalledWith('api/currentuser');

      expect(store.getActions()).toEqual([
        { type: OpportunityTypes.ADD_OPPORTUNITY, opportunity:  oppty}
      ]);
    });

  });
});

/*

it('load current user failed', async () => {
    (fetch as jest.MockedFunction<any>).mockResolvedValueOnce({ ok: false });
    await store.dispatch(actions.loadCurrentUser());
    expect(fetch).toBeCalledWith('api/currentuser');
    expect(store.getActions()).toEqual([
      { type: actions.LOAD_CURRENT_USER_REQUEST },
      {
        type: actions.LOAD_CURRENT_USER_FAILURE,
        payload: {
          type: null,
          message: 'error'
        }
      }
    ]);
  });

  it('load current user failed when fetch error', async () => {
    (fetch as jest.MockedFunction<any>).mockRejectedValueOnce(new Error('fetch error'));
    await store.dispatch(actions.loadCurrentUser());
    expect(fetch).toBeCalledWith('api/currentuser');
    expect(store.getActions()).toEqual([
      { type: actions.LOAD_CURRENT_USER_REQUEST },
      {
        type: actions.LOAD_CURRENT_USER_FAILURE,
        payload: {
          type: 'Error',
          message: 'fetch error'
        }
      }
    ]);
  });*/
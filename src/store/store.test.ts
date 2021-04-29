import * as reduxStore from './store';

describe('Store', () => {
  it('should create store', () => {
    const initialState: reduxStore.AppState = {
      opportunities:{

      }
    };
    const store = reduxStore.configureStore(initialState);
    store.dispatch({
      type: 'TestAction'
    });
    expect(store.getState()).toEqual(initialState);
  });
});

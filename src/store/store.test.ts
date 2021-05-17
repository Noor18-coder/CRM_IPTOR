import { store } from './store';

describe('Store', () => {
  it('should create store and dispatching non-existing action shouldn\'t change the Store', () => {
    const initialState = store.getState();

    store.dispatch({
      type: 'TestAction'
    });
    expect(store.getState()).toEqual(initialState);
  });
});


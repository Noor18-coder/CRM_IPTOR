import * as reduxStore from './store';

describe('Store', () => {
  it('should create store', () => {
    const initialState: reduxStore.AppState = {
      opportunities:{

      },
      auth:{
          loginWithoutCompany:false,
          login: false,
          loading: false,
          error: false,
          user: {
            defaultSalesOrderType: '',
            description: '',
            user: '',
            handler: '',
            language: '',
            currentEnvironment: []
          }
        }
    };
    const store = reduxStore.configureStore(initialState);
    store.dispatch({
      type: 'TestAction'
    });
    expect(store.getState()).toEqual(initialState);
  });
});

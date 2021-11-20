import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Routes from './Routes';
import StoreMock from './mocks/Store.mock';

describe('[Shared] Header', () => {
  it('should renders correctly when not loged in', () => {
    const store = StoreMock.createInitialStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly when loged in', () => {
    const store = StoreMock.createInitialLoginStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

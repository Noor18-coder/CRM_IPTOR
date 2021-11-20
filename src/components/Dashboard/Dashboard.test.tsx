import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Dashboard from './Dashboard';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Dashboard] Dashboard', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Reports from './Reports';
import StoreMock from '../../mocks/Store.mock';

jest.mock('axios');
const store = StoreMock.createInitialStore();

describe('[Reports] Reports', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Reports />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

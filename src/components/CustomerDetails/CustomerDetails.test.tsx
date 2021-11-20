import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CustomerDetails from './CustomerDetails';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const location = { state: { custId: '' } };

describe('[CustomerDetails] CustomerDetails', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CustomerDetails location={location} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CustomerInfo from './CustomerInfo';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const data = { name: '', isParent: false, country: 'USA' };

describe('[CustomerDetails] CustomerInfo', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CustomerInfo data={data} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

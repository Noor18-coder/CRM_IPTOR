import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditCustomer from './EditCustomer';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[AddCustomer] EditCustomer', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EditCustomer groupType="default fields" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

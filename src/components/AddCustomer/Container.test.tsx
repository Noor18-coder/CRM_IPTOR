import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Container from './Container';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[AddCustomer] Container', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Container containerType="add" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

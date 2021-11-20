import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import DashboarCustomerdWidgets from './DashboardCustomerWidgets';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Dashboard] DashboarCustomerdWidgets', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DashboarCustomerdWidgets />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditAttributes from './EditAttributes';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[EditOpportunity] EditAttributes', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EditAttributes />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

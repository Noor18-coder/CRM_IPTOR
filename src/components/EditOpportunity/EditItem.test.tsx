import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditItem from './EditItem';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[EditOpportunity] EditItem', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EditItem />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

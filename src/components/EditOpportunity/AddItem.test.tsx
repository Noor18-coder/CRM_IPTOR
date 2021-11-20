import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddItem from './AddItem';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[EditOpportunity] AddItem', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddItem />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

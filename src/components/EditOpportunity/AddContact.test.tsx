import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddContact from './AddContact';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[EditOpportunity] AddContact', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddContact />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

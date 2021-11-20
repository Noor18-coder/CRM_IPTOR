import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Opportunities from './Opportunities';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const location = { state: {} };

describe('[Opportunity] Opportunities', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Opportunities location={location} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

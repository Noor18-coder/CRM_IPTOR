import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddOpportunity from './AddOpportunity';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[AddOpportunity] AddOpportunity', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

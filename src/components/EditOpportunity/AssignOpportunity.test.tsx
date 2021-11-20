import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AssignOpportunity from './AssignOpportunity';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[EditOpportunity] AssignOpportunity', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AssignOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

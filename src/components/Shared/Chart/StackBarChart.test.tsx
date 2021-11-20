import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import StackBarChart from './StackBarChart';
import StoreMock from '../../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Shared] StackBarChart', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <StackBarChart data={[]} selectedFilter="" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

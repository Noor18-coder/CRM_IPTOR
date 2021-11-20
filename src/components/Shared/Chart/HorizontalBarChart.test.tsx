import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import HorizontalBarChart from './HorizontalBarChart';
import StoreMock from '../../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const data = [
  {
    customerName: 'samecustomer',
    inProgressValue: true,
  },
];

describe('[Shared] HorizontalBarChart', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <HorizontalBarChart data={data} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

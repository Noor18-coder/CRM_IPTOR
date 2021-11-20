import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Staging from './Staging';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[OpportunityDetails] ProductAccordian', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Staging />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { OpportunityDetails } from './OpportunityDetails';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const location = { state: { oppid: '' } };

describe('[OpportunityDetails] OpportunityDetails', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OpportunityDetails location={location} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

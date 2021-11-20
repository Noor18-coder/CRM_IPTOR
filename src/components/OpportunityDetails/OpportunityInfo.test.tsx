import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import OpportunityInfo from './OpportunityInfo';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[OpportunityDetails] OpportunityInfo', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OpportunityInfo />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

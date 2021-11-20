import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import OpportunityListMobile from './OpportunityListMobile';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const getDataRows = jest.fn();

describe('[Opportunity] OpportunityCard', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OpportunityListMobile getDataRows={getDataRows} refresh={false} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

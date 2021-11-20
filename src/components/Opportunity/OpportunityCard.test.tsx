import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import OpportunityCard from './OpportunityCard';
import StoreMock from '../../mocks/Store.mock';
import { OpportunityListItem } from '../../helpers/Api/models';

const store = StoreMock.createInitialStore();
const opportunity = {} as OpportunityListItem;

describe('[Opportunity] OpportunityCard', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OpportunityCard opportunity={opportunity} name="hello" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

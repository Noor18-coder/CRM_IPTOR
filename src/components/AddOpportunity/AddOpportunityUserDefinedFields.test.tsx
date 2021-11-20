import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddOpportunityUserDefinedFields from './AddOpportunityUserDefinedFields';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const changeStep = jest.fn();

describe('[AddOpportunity] AddOpportunityUserDefinedFields', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddOpportunityUserDefinedFields changeStep={changeStep} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

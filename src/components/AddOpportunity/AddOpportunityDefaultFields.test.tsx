import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddOpportunityDefaultFields from './AddOpportunityDefaultFields';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const changeStep = jest.fn();

describe('[AddOpportunity] AddOpportunityDefaultFields', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddOpportunityDefaultFields changeStep={changeStep} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

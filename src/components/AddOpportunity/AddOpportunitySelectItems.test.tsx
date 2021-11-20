import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddOpportunitySelectItems from './AddOpportunitySelectItems';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const createOpportunity = jest.fn();
const changeStep = jest.fn();

describe('[AddOpportunity] AddOpportunitySelectItems', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddOpportunitySelectItems createOpportunity={createOpportunity} changeStep={changeStep} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

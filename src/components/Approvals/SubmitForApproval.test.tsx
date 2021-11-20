import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import SubmitForApproval from './SubmitForApproval';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const reloadOpportunity = jest.fn();

describe('[Approvals] SubmitForApproval', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SubmitForApproval reloadOpportunity={reloadOpportunity} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

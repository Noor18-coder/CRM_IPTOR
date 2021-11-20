import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ApproverSubmit from './ApproverSubmit';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const reloadOpportunity = jest.fn();

describe('[Approvals] ApproverSubmit', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ApproverSubmit reloadOpportunity={reloadOpportunity} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

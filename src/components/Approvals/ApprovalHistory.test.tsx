import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ApprovalHistory from './ApprovalHistory';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Approvals] ApprovalHistory', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ApprovalHistory />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

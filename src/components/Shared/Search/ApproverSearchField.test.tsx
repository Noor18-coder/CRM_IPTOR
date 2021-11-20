import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ApproverSearchField from './ApproverSearchField';
import StoreMock from '../../../mocks/Store.mock';

const onChange = jest.fn();
const description = 'some description';
const disabled = false;
const currentSelectedUser = 'user';
const value = 'theValue';

const store = StoreMock.createInitialStore();

describe('[Shared] ApproverSearchField', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ApproverSearchField
            onChange={onChange}
            description={description}
            disabled={disabled}
            currentSelectedUser={currentSelectedUser}
            value={value}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

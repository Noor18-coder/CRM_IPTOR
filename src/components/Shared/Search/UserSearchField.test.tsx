import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import UserSearchField from './UserSearchField';
import StoreMock from '../../../mocks/Store.mock';

const onChange = jest.fn();
const description = 'some description';
const currentSelectedUser = 'user';

const store = StoreMock.createInitialStore();

describe('[Shared] UserSearchField', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <UserSearchField onChange={onChange} description={description} currentSelectedUser={currentSelectedUser} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

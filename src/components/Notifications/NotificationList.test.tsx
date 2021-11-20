import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NotificationList from './NotificationList';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Notification] NotificationList', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NotificationList />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

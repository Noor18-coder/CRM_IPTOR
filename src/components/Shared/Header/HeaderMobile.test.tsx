import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import HeaderMobile from './HeaderMobile';
import StoreMock from '../../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Shared] Header', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <HeaderMobile />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

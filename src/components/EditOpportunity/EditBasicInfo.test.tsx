import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditBasicInfo from './EditBasicInfo';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[EditOpportunity] EditBasicInfo', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EditBasicInfo />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

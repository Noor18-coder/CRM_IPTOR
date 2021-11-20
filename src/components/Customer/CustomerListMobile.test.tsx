import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import BusinessPartnerListMobile from './CustomerListMobile';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const gridRowClicked = jest.fn();
const getDataRows = jest.fn();

describe('[Customer] BusinessPartnerListMobile', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BusinessPartnerListMobile gridRowClicked={gridRowClicked} getDataRows={getDataRows} refresh={false} searchLoader={false} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

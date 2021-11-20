import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import BusinessPartnerCard from './CustomerCard';
import StoreMock from '../../mocks/Store.mock';
import BusinessPartnerListItemMock from '../../mocks/BusinessPartnerListItem.mock';

const store = StoreMock.createInitialStore();
const businesspartner = BusinessPartnerListItemMock.getBusinessPartnerListItemConstVal()[0];

describe('[Customer] BusinessPartnerCard', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BusinessPartnerCard businesspartner={businesspartner} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

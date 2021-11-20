import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CustomerCard from './CustomerCard';
import StoreMock from '../../mocks/Store.mock';
import CustomerDetails from '../../mocks/CustomerDetails.mock';

const store = StoreMock.createInitialStore();
const contactsData = CustomerDetails.getCustomerDetailsContactsGroupItemConstVal();
const data = {
  numberOfInactiveOpportunities: '',
  numberOfActiveOpportunities: '',
  addressLine1: '',
  phone: '',
  productFamily: '',
  owner: '',
  active: false,
  area: '',
};

describe('[CustomerDetails] CustomerCard', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CustomerCard contactsData={contactsData} data={data} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

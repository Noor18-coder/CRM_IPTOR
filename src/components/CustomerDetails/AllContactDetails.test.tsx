import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { AllContactsAccordian } from './AllContactDetails';
import StoreMock from '../../mocks/Store.mock';
import CustomerDetails from '../../mocks/CustomerDetails.mock';

const store = StoreMock.createInitialStore();
const contactData = CustomerDetails.getCustomerDetailsContactsGroupItemConstVal();

describe('[CustomerDetails] AllContactsAccordian', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AllContactsAccordian contactData={contactData} title="title" activeCustomer={false} customerOwner="" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

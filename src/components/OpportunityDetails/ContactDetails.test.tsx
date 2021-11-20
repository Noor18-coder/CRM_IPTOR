import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { ContactAccordian, ContactCards } from './ContactDetails';
import StoreMock from '../../mocks/Store.mock';
import { OpportunityContact } from '../../helpers/Api/models';

const store = StoreMock.createInitialStore();
const data = {} as OpportunityContact;

describe('[OpportunityDetails] ContactAccordian', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ContactAccordian opportunityId="theId" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] ContactCards', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ContactCards data={data} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MoreInfoAccordian, DisplayGroup, MoreInfoAccordianMobile, DisplayGroupMobile } from './MoreInfo';
import StoreMock from '../../mocks/Store.mock';
import { OpportunityDetailsBasicInfo, CustomerDetailsDefault } from '../../helpers/Api/models';

const store = StoreMock.createInitialStore();
const data = [] as OpportunityDetailsBasicInfo[];
const customerDetails = {} as CustomerDetailsDefault;

describe('[CustomerDetails] MoreInfoAccordian', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MoreInfoAccordian title="title" data={data} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[CustomerDetails] DisplayGroup', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DisplayGroup title="title" data={data} customerDetails={customerDetails} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[CustomerDetails] MoreInfoAccordianMobile', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MoreInfoAccordianMobile title="title" data={data} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[CustomerDetails] DisplayGroupMobile', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DisplayGroupMobile title="title" data={data} customerDetails={customerDetails} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

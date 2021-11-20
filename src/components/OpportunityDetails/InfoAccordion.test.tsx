import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { InfoAccordion, InfoAccordionGroups, DisplayGroup, DisplayGroupMobile, AccordianForMobileWithGroups } from './InfoAccordion';
import StoreMock from '../../mocks/Store.mock';
import { OpportunityDetailsBasicInfo, AttributeField, AttributeValueObject } from '../../helpers/Api/models';

const store = StoreMock.createInitialStore();
const data = [] as OpportunityDetailsBasicInfo[];
const fields = [] as AttributeField[];
const groupData = [] as AttributeValueObject[];
const openEditOpportunity = jest.fn();
const openEditForm = jest.fn();

describe('[OpportunityDetails] InfoAccordion', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <InfoAccordion title="title" data={data} openEditOpportunity={openEditOpportunity} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] InfoAccordionGroups', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <InfoAccordionGroups title="title" oppType="oppType" openEditForm={openEditForm} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] DisplayGroup', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DisplayGroup title="title" fields={fields} data={groupData} openEditForm={openEditForm} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] DisplayGroupMobile', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DisplayGroupMobile fields={fields} data={groupData} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] AccordianForMobileWithGroups', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AccordianForMobileWithGroups title="title" oppType="oppType" openEditForm={openEditForm} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

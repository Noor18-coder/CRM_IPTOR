import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ApprovalPopup from './ApprovalPopup';
import StoreMock from '../../mocks/Store.mock';
import { UserMock } from '../../mocks/User.mock';
import { AppState } from '../../store';

const reloadOpportunityDetailsPage = jest.fn();

describe('[Approvals] ApprovalPopup', () => {
  it('should renders correctly', () => {
    const store = StoreMock.createInitialStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <ApprovalPopup reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to show approval popup history values', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'history' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <ApprovalPopup reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to show approval popup submit approval values', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'submit_approval' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <ApprovalPopup reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to show approver submit values', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'approverSubmit' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <ApprovalPopup reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

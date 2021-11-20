import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditOpportunity from './EditOpportunity';
import StoreMock from '../../mocks/Store.mock';
import { AppState } from '../../store';
import { UserMock } from '../../mocks/User.mock';

describe('[EditOpportunity] EditOpportunity', () => {
  it('should renders correctly', () => {
    const store = StoreMock.createInitialStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to edit opportunity basic values', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'opportunity_defaults' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to add contact to given opportunity', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'add_contact' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to edit items assigned to an opportunity', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'edit_item' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the component to add items to an opportunity', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'add_item' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to assign (change ownership) of the opportunity', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'assign_opportunity' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to de-activate the opportunity', () => {
    const initialState = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initialState,
      users: { ...initialState.users, users: UserMock.getUsers(1) },
      opportuntyDetails: {
        ...initialState.opportuntyDetails,
        editOportunity: { ...initialState.opportuntyDetails.editOportunity, groupName: 'deactivate-opportunity' },
      },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const tree = renderer
      .create(
        <Provider store={store}>
          <EditOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

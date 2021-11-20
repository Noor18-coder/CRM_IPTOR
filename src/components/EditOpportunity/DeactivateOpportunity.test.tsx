import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import DeactivateOpportunity from './DeactivateOpportunity';
import StoreMock from '../../mocks/Store.mock';
import * as models from '../../helpers/Api/models';

const store = StoreMock.createInitialStore();
const mockStore = configureStore();

const reasonCodes: models.Reason[] = [
  {
    reasonCode: 'ERR',
    description: 'Mistake',
  },
  {
    reasonCode: 'LOST',
    description: ' Opportunity lost',
  },
  {
    reasonCode: 'NOT_CMP',
    description: 'Not competitive deal',
  },
];

describe('[EditOpportunity] DeactivateOpportunity', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DeactivateOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render component to edit opportunity basic values', () => {
    const initialState = {
      enviornmentConfigs: {
        reasons: reasonCodes,
      },
    };
    const basicGroupStore = mockStore(initialState);

    const tree = renderer
      .create(
        <Provider store={basicGroupStore}>
          <DeactivateOpportunity />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

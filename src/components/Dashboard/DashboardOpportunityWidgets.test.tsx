import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import DashboardOpportunityWidgets from './DashboardOpportunityWidgets';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Dashboard] DashboardOpportunityWidgets', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DashboardOpportunityWidgets />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { NavSection } from './NavSection';
import StoreMock from '../../../mocks/Store.mock';

const backToOpportunityList = jest.fn();
const store = StoreMock.createInitialStore();

describe('[Shared] NavSection', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavSection backToOpportunityList={backToOpportunityList} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[OpportunityDetails] OpportunityInfoMobile', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OpportunityInfoMobile />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

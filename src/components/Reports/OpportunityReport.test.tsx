import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { OpportunityReport, CardList } from './OpportunityReport';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Reports] OpportunityReport', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OpportunityReport />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[Reports] CardList', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CardList title="title" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

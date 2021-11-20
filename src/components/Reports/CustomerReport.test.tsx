import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { CustomerReport, CardList } from './CustomerReport';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

describe('[Reports] CustomerReport', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CustomerReport />
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

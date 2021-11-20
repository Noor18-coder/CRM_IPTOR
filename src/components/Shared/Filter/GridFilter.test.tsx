import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { GridFilter } from './GridFilter';
import StoreMock from '../../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const filters = [
  {
    value: '',
    selectParam: '',
  },
];
const selectOption = jest.fn();

describe('[Shared] GridFilter', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <GridFilter filters={filters} selectOption={selectOption} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

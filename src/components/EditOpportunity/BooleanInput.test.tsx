import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import BooleanInput from './BooleanInput';
import StoreMock from '../../mocks/Store.mock';
import AttributeMock from '../../mocks/Attribute.mock';

const store = StoreMock.createInitialStore();
const obj = AttributeMock.getAttributeFormFieldConstVal();
const onValueChange = jest.fn();

describe('[EditOpportunity] BooleanInput', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BooleanInput obj={obj} onValueChange={onValueChange} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

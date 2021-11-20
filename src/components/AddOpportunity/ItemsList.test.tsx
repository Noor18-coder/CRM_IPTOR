import renderer from 'react-test-renderer';
import ItemsList from './ItemsList';
import ItemMock from '../../mocks/Item.mock';

const items = ItemMock.getItemConstantValue();
const doClick = jest.fn();

describe('[AddOpportunity] ItemsList', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<ItemsList items={items} doClick={doClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import renderer from 'react-test-renderer';
import { OpportunityTypeList } from './OpportunityTypeList';
import OpportunityTypeMock from '../../mocks/OpportunityType.mock';

const opptyTypes = OpportunityTypeMock.getOpportunityTypesgetConstantValue();
const doClick = jest.fn();

describe('[AddOpportunity] OpportunityTypeList', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<OpportunityTypeList opptyTypes={opptyTypes} doClick={doClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

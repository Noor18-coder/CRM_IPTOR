import renderer from 'react-test-renderer';
import LeftColmData from './LeftColmData';

describe('[Login Shared] LeftColmData', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<LeftColmData />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

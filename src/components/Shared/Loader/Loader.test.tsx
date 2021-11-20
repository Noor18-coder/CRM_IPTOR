import renderer from 'react-test-renderer';
import Loader from './Loader';

describe('[Shared] Loader', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

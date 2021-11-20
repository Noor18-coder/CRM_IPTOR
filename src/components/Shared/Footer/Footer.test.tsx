import renderer from 'react-test-renderer';
import Footer from './Footer';

describe('[Shared] Footer', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

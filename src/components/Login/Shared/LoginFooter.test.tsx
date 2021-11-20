import renderer from 'react-test-renderer';
import LoginFooter from './LoginFooter';

describe('[Login Shared] LoginFooter', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<LoginFooter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

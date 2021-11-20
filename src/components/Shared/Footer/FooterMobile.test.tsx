import renderer from 'react-test-renderer';
import FooterMobile from './FooterMobile';

describe('[Shared] FooterMobile', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<FooterMobile page={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

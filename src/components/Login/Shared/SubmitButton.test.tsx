import renderer from 'react-test-renderer';
import { SubmitButton } from './SubmitButton';

const onClick = jest.fn();

describe('[Login Shared] SubmitButton', () => {
  it('should renders correctly with isSubmit false', () => {
    const tree = renderer.create(<SubmitButton title="The Button" isSubmit={false} onClick={onClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly with isSubmit true', () => {
    const tree = renderer.create(<SubmitButton title="The Button" isSubmit onClick={onClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

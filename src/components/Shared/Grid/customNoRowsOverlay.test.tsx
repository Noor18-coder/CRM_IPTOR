import renderer from 'react-test-renderer';
import CustomNoRowsOverlay from './customNoRowsOverlay';

const noRowsMessageFunc = jest.fn();

describe('[Shared] customNoRowsOverlay', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<CustomNoRowsOverlay noRowsMessageFunc={noRowsMessageFunc} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

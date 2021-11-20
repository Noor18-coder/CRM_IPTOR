import renderer from 'react-test-renderer';
import DateInput from './DateInput';

const currentDate = '2021-09-02T15:25:31+05:30';
const onDateSelect = jest.fn();

describe('DateInput', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<DateInput currentDate={currentDate} onDateSelect={onDateSelect} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

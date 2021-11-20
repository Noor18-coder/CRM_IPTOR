import renderer from 'react-test-renderer';
import LineChart from './LineChart';

const minDate = '2021-09-02T16:22:49+05:30';
const maxDate = '2021-12-02T16:22:49+05:30';
const closeDateData: any = [];
const group = '';
const filter = '';

describe('[Shared] LineChart', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(<LineChart minDate={minDate} maxDate={maxDate} closeDateData={closeDateData} group={group} filter={filter} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

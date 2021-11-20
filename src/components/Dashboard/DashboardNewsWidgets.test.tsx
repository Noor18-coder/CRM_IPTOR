import renderer from 'react-test-renderer';
import DashboardNewsWidgets from './DashboardNewsWidgets';

describe('[Dashboard] DashboardNewsWidgets', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<DashboardNewsWidgets />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

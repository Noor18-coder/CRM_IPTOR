import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Company } from './Company';
import { CompanyInfoMock } from '../../../mocks/CompanyInfo.mock';

const companies = CompanyInfoMock.getCompaniesConstVal();
const doClick = jest.fn();

describe('[Login Shared] Company', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<Company companies={companies} doClick={doClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call doClick on click', () => {
    const component = mount(<Company companies={companies} doClick={doClick} />);

    const li = component.find('li.action-icon');
    li.at(0).simulate('click');

    expect(doClick.mock.calls.length).toBeGreaterThan(0);
  });

  it('should call doClick on keypress', () => {
    const component = mount(<Company companies={companies} doClick={doClick} />);

    const li = component.find('li.action-icon');
    li.at(0).simulate('keydown', { key: 'Enter' });

    expect(doClick.mock.calls.length).toBeGreaterThan(0);
  });
});

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Company, Props}  from './Company';
import {CompanyInfoMock} from '../../../mocks/CompanyInfo.mock';
const  props:Props = {
    companies: CompanyInfoMock.getCompanies(5),
    doClick:  jest.fn()
  };

configure({ adapter: new Adapter() });

describe('<Company {...props} /> ', () => {
  let wrapper: any;


  beforeEach(() => {});

  it("should render the submit button", () => {
    wrapper = shallow(<Company {...props} />);
    expect(wrapper.find('.company-container').length).toEqual(5);
  });

  it("should render the submit button", () => {
    const  props:Props = {
        companies: CompanyInfoMock.getCompanies(2),
        doClick:  jest.fn()
      };
    wrapper = shallow(<Company {...props} />);
    //wrapper.find('.company-container').get(0);
    //console.log(firstItem);
    expect(wrapper.find('.company-container').at(0).simulate('click'));
    expect(props.doClick).toHaveBeenCalled();
  });
  
});

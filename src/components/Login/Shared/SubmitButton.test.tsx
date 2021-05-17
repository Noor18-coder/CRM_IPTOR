import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SubmitButton , Props}  from './SubmitButton';
const  props:Props = {
    title: 'test',
    onClick:  jest.fn()
  };

configure({ adapter: new Adapter() });

describe('<SubmitButton /> ', () => {
  let wrapper: any;


  beforeEach(() => {});

  it("should render the submit button", () => {
    wrapper = shallow(<SubmitButton {...props} />);
    expect(wrapper.find('.btn-login').length).toEqual(1);
  });

  it("should call the function on button click ", () => {
    wrapper = shallow(<SubmitButton {...props} />);
    wrapper.find('.btn-login').simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
  
});

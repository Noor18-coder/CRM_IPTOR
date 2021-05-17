import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GridFilter from './GridFilter';
const  props:Props = {
     filters : [{
      value:'all',
      name:'all',
      active:false
    }, {
      value:'rejected',
      name:'Rejected',
      active:false
    }, {
      value:'q4',
      name:'Q4',
      active:true
    },{
      value:'q3',
      name:'Q3',
      active:false
    },{
      value:'q2',
      name:'Q2',
      active:false
    },{
      value:'q1',
      name:'Q1',
      active:false
    }],
    selectOption:  jest.fn()
  };

configure({ adapter: new Adapter() });

describe('<GridFilter {...props} /> ', () => {
  let wrapper: any;


  beforeEach(() => {});

  it("should render the filters above grids", () => {
    wrapper = shallow(<GridFilter {...props} />);
    expect(wrapper.find('.btn').length).toEqual(7);
  });

  it("should select the filter on click", () => {
  
    wrapper = shallow(<GridFilter {...props} />);
   
    expect(wrapper.find('.btn').at(0).simulate('click'));
    expect(props.selectOption).toHaveBeenCalled();
  });
  
});

import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { mount ,shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import { Provider } from 'react-redux';

import { CompanySelection, Props } from './CompanySelection';
import { Company } from  './Shared/Company';
import {CompanyInfoMock} from '../../mocks/CompanyInfo.mock';

import { AppMock } from '../../mocks/App.Mocks';
import { CompanyInfoItem } from '../../helpers/Api/models';

const companies:CompanyInfoItem[] = CompanyInfoMock.getCompanies(1);

const initialState = AppMock.createAppInitialState();
const state = {...initialState,
  auth: {...initialState.auth, loginWithoutCompany:true, user:{currentEnvironment:companies}}
};

const store = AppMock.createStore(state);
const wrappedComponent = (store: any, props: any) => {
    return (
        <Provider store={store}>
        <CompanySelection {...props} />
      </Provider>
    )
}
   
describe('<CompanySelection /> ', () => {
  let wrapper: any;
  let container: any;
  let props: any;

  beforeEach(() => {
    container = document.createElement('div');
    props = {
        selectCompany: jest.fn(),
        backToLogin:  jest.fn()
    }
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });


  it('should match the snapshot', () => {
    wrapper = mount(wrappedComponent(store, props), {attachTo: container});
    expect(wrapper.exists()).toBe(true);
  });

  it('should match the snapshot', () => {
    wrapper = mount(wrappedComponent(store, props), {attachTo: container});
    expect(wrapper.find(Company)).toHaveLength(1);
  });

  it("should call the function on button click ", () => {
    wrapper = mount(wrappedComponent(store, props), {attachTo: container});
    wrapper.find('.desk-backto-login').simulate('click');
    expect(props.backToLogin).toHaveBeenCalled();
  });

  it("should call the function on button click ", () => {
    wrapper = mount(wrappedComponent(store, props), {attachTo: container});
    wrapper.find('.mobile-backto-login').simulate('click');
    expect(props.backToLogin).toHaveBeenCalled();
  }); 
  
});

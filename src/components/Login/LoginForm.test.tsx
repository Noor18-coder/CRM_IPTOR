import React from 'react';
import Enzyme, { mount ,shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

import LoginForm from './LoginForm';

import { AppMock } from '../../mocks/App.Mocks';
const initialState = AppMock.createAppInitialState();
const state = {...initialState,
  auth: {...initialState.auth}
};

const store = AppMock.createStore(state);
const wrappedComponent = (store: any) => {
    return (
        <Provider store={store}>
        <LoginForm />
      </Provider>
    )
}
   


describe('<LoginForm /> ', () => {
  let wrapper: any;
  let container: any;
  let props: any;

  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, 'useState')
  // useStateSpy.mockImplementation((init:AppState) => [init, setState]);

  beforeEach(() => {
    container = document.createElement('div');
    
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    jest.clearAllMocks();
  });


  it('should match the snapshot', () => {
    wrapper = mount(wrappedComponent(store), {attachTo: container});
    expect(wrapper.exists()).toBe(true);
  });

  it('should match the snapshot', () => {
    wrapper = mount(wrappedComponent(store), {attachTo: container});
    expect(wrapper.find('.loginpage')).toHaveLength(1);
  });

  it('should match the snapshot', () => {
    const state = {...initialState,
      auth: {...initialState.auth, loginWithoutCompany:true}
    };
    const store = AppMock.createStore(state);
    wrapper = mount(wrappedComponent(store), {attachTo: container});
    expect(wrapper.find('.companypage')).toHaveLength(1);
  });
});

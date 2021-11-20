import axios from 'axios';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AddCustomer from './AddCustomer';
import StoreMock from '../../mocks/Store.mock';
import { AppState } from '../../store';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';
import ConfigMock from '../../mocks/Config.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('[AddCustomer] AddCustomer', () => {
  let oGetElementById: any;
  beforeAll(() => {
    oGetElementById = document.getElementById;
  });
  afterAll(() => {
    document.getElementById = oGetElementById;
  });

  it('should renders correctly', () => {
    const store = StoreMock.createInitialStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddCustomer />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change value of input', async () => {
    document.getElementById = jest.fn().mockImplementation((id) => ({ id, style: { border: '' } }));

    const initSt = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initSt,
      enviornmentConfigs: {
        ...initSt.enviornmentConfigs,
        defaultOpprtunityInfo: { ...initSt.enviornmentConfigs.defaultOpprtunityInfo, currencyLDA: 'USD', language: 'en' },
        crmCountryInfo: ConfigMock.getCountryInfo(5),
        crmAreaInfo: ConfigMock.getAreaInfo(5),
      },
      auth: { ...initSt.auth, user: { ...initSt.auth.user, role: 'Admin' } },
    };

    const store = StoreMock.createAnyStore<AppState>(state);
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse();
    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    const wrapper = mount(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    expect(wrapper.contains(<AddCustomer />)).toBe(true);

    const nameInp = wrapper.find('input#name');
    const addressLine1Inp = wrapper.find('input#addressLine1');
    const countryInp = wrapper.find('select#country');
    const EMAILInp = wrapper.find('input#EMAIL');
    const areaInp = wrapper.find('select#area');
    const phoneInp = wrapper.find('input#phone');
    const addCustomerBtn = wrapper.find('button#addCustomerBtn');

    (nameInp.instance() as any).value = 'Some Name';
    (addressLine1Inp.instance() as any).value = 'Street Address';
    (EMAILInp.instance() as any).value = 'some@gmail.com';
    (phoneInp.instance() as any).value = '1234567890';

    (countryInp.find('option').at(3).instance() as any).selected = true;
    (areaInp.find('option').at(3).instance() as any).selected = true;

    nameInp.simulate('change').simulate('blur');
    addressLine1Inp.simulate('change').simulate('blur');
    countryInp.simulate('change').simulate('blur');
    EMAILInp.simulate('change').simulate('blur');
    areaInp.simulate('change').simulate('blur');
    phoneInp.simulate('change').simulate('blur');

    expect(nameInp.hasClass('form-control')).toBe(true);
    expect(addressLine1Inp.hasClass('form-control')).toBe(true);
    expect(countryInp.hasClass('form-control')).toBe(true);
    expect(EMAILInp.hasClass('form-control')).toBe(true);
    expect(areaInp.hasClass('form-control')).toBe(true);
    expect(phoneInp.hasClass('form-control')).toBe(true);

    expect(addCustomerBtn.hasClass('disable-link')).toBe(true);
  });

  it('should change value of input on blur', async () => {
    document.getElementById = jest.fn().mockImplementation((id) => ({ id, style: { border: '' } }));

    const initSt = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initSt,
      enviornmentConfigs: {
        ...initSt.enviornmentConfigs,
        defaultOpprtunityInfo: { ...initSt.enviornmentConfigs.defaultOpprtunityInfo, currencyLDA: 'USD', language: 'en' },
        crmCountryInfo: ConfigMock.getCountryInfo(5),
        crmAreaInfo: ConfigMock.getAreaInfo(5),
      },
      auth: { ...initSt.auth, user: { ...initSt.auth.user, role: 'Admin' } },
    };

    const store = StoreMock.createAnyStore<AppState>(state);
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse();
    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    const wrapper = mount(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    expect(wrapper.contains(<AddCustomer />)).toBe(true);

    const nameInp = wrapper.find('input#name');
    const addressLine1Inp = wrapper.find('input#addressLine1');
    const countryInp = wrapper.find('select#country');
    const EMAILInp = wrapper.find('input#EMAIL');
    const areaInp = wrapper.find('select#area');
    const phoneInp = wrapper.find('input#phone');
    const addCustomerBtn = wrapper.find('button#addCustomerBtn');

    (nameInp.instance() as any).value = '';
    (addressLine1Inp.instance() as any).value = '';
    (EMAILInp.instance() as any).value = '';
    (phoneInp.instance() as any).value = '';

    (countryInp.find('option').at(0).instance() as any).selected = true;
    (areaInp.find('option').at(0).instance() as any).selected = true;

    nameInp.simulate('change').simulate('blur');
    addressLine1Inp.simulate('change').simulate('blur');
    countryInp.simulate('change').simulate('blur');
    EMAILInp.simulate('change').simulate('blur');
    areaInp.simulate('change').simulate('blur');
    phoneInp.simulate('change').simulate('blur');

    expect(nameInp.hasClass('form-control')).toBe(true);
    expect(addressLine1Inp.hasClass('form-control')).toBe(true);
    expect(countryInp.hasClass('form-control')).toBe(true);
    expect(EMAILInp.hasClass('form-control')).toBe(true);
    expect(areaInp.hasClass('form-control')).toBe(true);
    expect(phoneInp.hasClass('form-control')).toBe(true);

    expect(addCustomerBtn.hasClass('disable-link')).toBe(true);
  });

  it('should not validate email on change', async () => {
    const style = { border: '' };
    document.getElementById = jest.fn().mockImplementation((id) => ({ id, style }));
    const docSpy = jest.spyOn(document, 'getElementById');

    const initSt = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initSt,
      enviornmentConfigs: {
        ...initSt.enviornmentConfigs,
        defaultOpprtunityInfo: { ...initSt.enviornmentConfigs.defaultOpprtunityInfo, currencyLDA: 'USD', language: 'en' },
        crmCountryInfo: ConfigMock.getCountryInfo(5),
        crmAreaInfo: ConfigMock.getAreaInfo(5),
      },
      auth: { ...initSt.auth, user: { ...initSt.auth.user, role: 'Admin' } },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const wrapper = mount(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    expect(wrapper.contains(<AddCustomer />)).toBe(true);

    const EMAILInp = wrapper.find('input#EMAIL');
    const EMAILInpInstance = EMAILInp.instance() as any;
    EMAILInpInstance.value = 'someemail';
    EMAILInp.simulate('change');

    expect(EMAILInp.hasClass('form-control')).toBe(true);
    expect(style.border).toBe('1px solid #ED2024');
    expect(docSpy).toHaveBeenCalledWith('EMAIL');
  });

  it('should not validate phone on change', async () => {
    const style = { border: '' };
    document.getElementById = jest.fn().mockImplementation((id) => ({ id, style }));
    const docSpy = jest.spyOn(document, 'getElementById');

    const initSt = StoreMock.createAppInitialState();
    const state: AppState = {
      ...initSt,
      enviornmentConfigs: {
        ...initSt.enviornmentConfigs,
        defaultOpprtunityInfo: { ...initSt.enviornmentConfigs.defaultOpprtunityInfo, currencyLDA: 'USD', language: 'en' },
        crmCountryInfo: ConfigMock.getCountryInfo(5),
        crmAreaInfo: ConfigMock.getAreaInfo(5),
      },
      auth: { ...initSt.auth, user: { ...initSt.auth.user, role: 'Admin' } },
    };

    const store = StoreMock.createAnyStore<AppState>(state);

    const wrapper = mount(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    expect(wrapper.contains(<AddCustomer />)).toBe(true);

    const phoneInp = wrapper.find('input#phone');
    const phoneInpInstance = phoneInp.instance() as any;
    phoneInpInstance.value = 'ssjasjh';
    phoneInp.simulate('change');

    expect(phoneInp.hasClass('form-control')).toBe(true);
    expect(style.border).toBe('1px solid #ED2024');
    expect(docSpy).toHaveBeenCalledWith('phone');
  });
});

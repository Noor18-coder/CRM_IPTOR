import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { CompanySelection } from './CompanySelection';
import StoreMock from '../../mocks/Store.mock';

const store = StoreMock.createInitialStore();
const selectCompany = jest.fn();
const backToLogin = jest.fn();

describe('[Login] CompanySelection', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CompanySelection selectCompany={selectCompany} backToLogin={backToLogin} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

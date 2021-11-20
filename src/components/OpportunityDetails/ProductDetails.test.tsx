import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { ProductAccordian, ProductCards, ProductCardsTable } from './ProductDetails';
import StoreMock from '../../mocks/Store.mock';
import { Product } from '../../helpers/Api/models';

jest.mock('axios');
const store = StoreMock.createInitialStore();
const product = {} as Product;

describe('[OpportunityDetails] ProductAccordian', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ProductAccordian opportunityId="opportunityId" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] ProductCards', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ProductCards opportunityId="opportunityId" data={product} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('[OpportunityDetails] ProductCardsTable', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ProductCardsTable opportunityId="opportunityId" data={product} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

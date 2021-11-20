import axios from 'axios';
import Items from './Items';
import { ApiRequest } from './ApiRequest';
import ItemMock from '../../mocks/Item.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Items', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get fore casts info', async () => {
    const params = ItemMock.getItemsApiMethodParams();
    const responseData = ItemMock.getItemResponse();
    const requestData = new ApiRequest('items.get', {}, { freeTextSearch: params.freeTextSearch, limit: params.limit, offset: params.offset });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Items.get(params.freeTextSearch, params.offset, params.limit)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});

import { ApiRequest } from './ApiRequest';
import { ApiRequestParams } from './models';

describe('ApiRequest', () => {
  let request: ApiRequest<ApiRequestParams>;

  beforeEach(() => {
    request = new ApiRequest<ApiRequestParams>('items.get', { businessPartner: '512008' }, { freeTextSearch: 'item', limit: 20, offset: 0 });
  });

  it('should have created', () => {
    expect(request).toBeInstanceOf(ApiRequest);
  });

  it('should have supplied parameters as properties', () => {
    expect(request.method).toEqual('items.get');
    expect(request.params ? request.params.businessPartner : null).toEqual('512008');
    expect(request.control ? request.control.freeTextSearch : null).toEqual('item');
    expect(request.control ? request.control.limit : null).toEqual(20);
    expect(request.control ? request.control.offset : null).toEqual(0);
  });
});

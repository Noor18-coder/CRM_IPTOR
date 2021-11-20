import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ProductMock {
  static getProduct(num: number): apiModels.Product[] {
    return Array(num).fill({
      itemId: faker.random.uuid(),
      itemDescription: faker.commerce.productAdjective(),
      parentFile: faker.random.word(),
      parentId: faker.random.uuid(),
      rootId: faker.random.uuid(),
      lineNumber: faker.random.number({ max: 99999 }).toString(),
      item: faker.commerce.productName(),
      ourPrice: faker.commerce.price(999, 99999),
      systemPrice: faker.commerce.price(999, 99999),
      existsInItemFile: faker.random.boolean(),
      price: faker.random.boolean(),
      unit: faker.random.word(),
      quantity: faker.random.number({ max: 99999 }),
      hasNote: faker.random.boolean(),
      hasContact: faker.random.boolean(),
      hasAttribute: faker.random.boolean(),
    });
  }

  static getProductResponse(num?: number): apiModels.ProductResponse {
    return {
      data: {
        items: this.getProduct(num ?? 1),
      },
    };
  }
}

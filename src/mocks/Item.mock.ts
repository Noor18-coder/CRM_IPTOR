import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ItemMock {
  static getItems(num: number): apiModels.Item[] {
    return Array(num).fill({
      item: faker.lorem.word(),
      description: faker.lorem.words(5),
      internalDescription: faker.lorem.word(),
      accountGroup: faker.commerce.productAdjective(),
      creationDate: faker.date.past(),
      itemCategory1: faker.random.word(),
      itemCategory2: faker.random.word(),
      itemCategory3: faker.random.word(),
      itemCategory4: faker.random.word(),
      itemCategory5: faker.random.word(),
      itemCategory6: faker.random.word(),
      itemGroup: faker.random.word(),
      itemType: faker.random.word(),
      responsible: faker.random.word(),
      mainSupplier: faker.random.word(),
      userDefinedNum1: faker.random.number(3),
      userDefinedNum2: faker.random.number(3),
      userDefinedAlpha1: faker.random.word(),
      userDefinedAlpha2: faker.random.word(),
      stockingUnit: faker.random.word(),
      defaultSalesUnit: faker.random.word(),
      commodityCode: faker.random.word(),
      supplierQuotationGroup: faker.random.word(),
      itemDiscountGroup: faker.random.word(),
      itemPriceGroup: faker.random.word(),
      itemFamily: faker.random.word(),
      itemSector: faker.random.word(),
      planner: faker.random.word(),
      drawingNumber: faker.random.word(),
      handlingStatus: faker.random.word(),
      itemSegment1: faker.random.word(),
      itemSegment2: faker.random.word(),
      itemSegment3: faker.random.word(),
      itemSegment4: faker.random.word(),
      itemSegment5: faker.random.word(),
      itemSegment6: faker.random.word(),
      primarySegmant: faker.random.word(),
      msdsId: faker.random.word(),
      version: faker.random.number(1).toString(),
      cost: faker.random.number(2).toString(),
      revenue: faker.random.number(3).toString(),
    });
  }

  static getItemConstantValue(): apiModels.Item[] {
    return [
      {
        item: 'repellendus',
        description: 'quia esse et eos quos',
        internalDescription: 'laudantium',
        accountGroup: 'Refined',
        creationDate: '2020-11-16T06:41:31.175Z',
        itemCategory1: 'Electronics',
        itemCategory2: 'Delaware',
        itemCategory3: 'Omani',
        itemCategory4: 'out-of-the-box',
        itemCategory5: 'Colorado',
        itemCategory6: 'Tuna',
        itemGroup: 'Cyprus',
        itemType: 'haptic',
        responsible: 'Zealand',
        mainSupplier: 'calculate',
        userDefinedNum1: 0,
        userDefinedNum2: 3,
        userDefinedAlpha1: 'infrastructures',
        userDefinedAlpha2: 'lavender',
        stockingUnit: 'Savings',
        defaultSalesUnit: 'calculate',
        commodityCode: 'applications',
        supplierQuotationGroup: 'collaborative',
        itemDiscountGroup: 'Secured',
        itemPriceGroup: 'web',
        itemFamily: 'Card',
        itemSector: 'hardware',
        planner: 'matrix',
        drawingNumber: 'Avon',
        handlingStatus: 'online',
        itemSegment1: 'Personal',
        itemSegment2: 'back',
        itemSegment3: 'unleash',
        itemSegment4: 'Rubber',
        itemSegment5: 'Avon',
        itemSegment6: 'primary',
        primarySegmant: 'USB',
        msdsId: 'hack',
        version: '0',
        cost: '1',
        revenue: '2',
      },
    ];
  }

  static getItemsApiMethodParams(): apiModels.ItemsApiMethodParams {
    return {
      freeTextSearch: faker.random.word(),
      limit: 100,
      offset: 0,
    };
  }

  static getItemResponse(num?: number): apiModels.ItemResponse {
    return {
      control: {
        total: num ?? 1,
      },
      data: {
        items: this.getItems(num ?? 1),
      },
    };
  }
}

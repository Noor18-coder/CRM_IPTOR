import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class OpportunityTypeMock {
  static getOpportunityTypes(num: number): apiModels.OpportunityType[] {
    return Array(num).fill({
      oppRecordType: faker.random.word(),
      description: faker.random.word(),
      MANDATORY_FIELDS: Array(2).fill(faker.random.word()),
      OPTIONAL_FIELDS: Array(2).fill(faker.random.word()),
    });
  }

  static getOpportunityTypesgetConstantValue(): apiModels.OpportunityType[] {
    return [
      {
        oppRecordType: 'Avon',
        description: 'Rubber',
        MANDATORY_FIELDS: ['Infrastructure', 'Infrastructure'],
        OPTIONAL_FIELDS: ['Regional', 'Regional'],
      },
    ];
  }

  static getDefaultOpportunityInfo(): apiModels.DefaultOpportunityInfo {
    return {
      currentDate: faker.date.future().toISOString(),
      language: faker.locale.toString(),
      user: faker.internet.userName(),
      currencyLDA: faker.finance.currencyCode(),
      stageCreated: faker.random.word(),
    };
  }

  static getOpportunityTypeResponse(num?: number): apiModels.OpportunityTypeResponse {
    return {
      data: {
        items: this.getOpportunityTypes(num ?? 1),
      },
    };
  }

  static getDefaultOpportunityInfoResponse(): apiModels.DefaultOpportunityInfoResponse {
    return {
      data: this.getDefaultOpportunityInfo(),
    };
  }
}

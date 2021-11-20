import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class DashboardInfoMock {
  static getLogsListParams(): apiModels.LogsListParams {
    return {
      logParentFile: faker.random.word().toUpperCase(),
      loggedAction: faker.random.word().toLowerCase(),
    };
  }

  static getLogsApiMethodParams(): apiModels.LogsApiMethodParams {
    return {
      limit: 100,
      orderBy: faker.random.arrayElement(['asc, desc']),
      otherparams: this.getLogsListParams(),
    };
  }

  static getLogsInfoItem(num: number): apiModels.LogsInfoItem[] {
    return Array(num).fill({
      logId: faker.random.uuid(),
      creationDate: faker.date.past().toDateString(),
      creationTime: faker.date.past().toTimeString(),
      parentFile: faker.random.word().toUpperCase(),
      parentId: faker.random.uuid(),
      loggedAction: faker.random.word().toLowerCase(),
    });
  }

  static getLogsListResponse(num?: number): apiModels.LogsListResponse {
    return {
      data: {
        items: this.getLogsInfoItem(num ?? 1),
      },
    };
  }

  static getStatisticsDetailsParams(): apiModels.StatisticsDetailsParams {
    return {
      groupBy: faker.random.word(),
      closeDateFrom: faker.date.past().toISOString(),
      closeDateTo: faker.date.recent().toISOString(),
    };
  }

  static getOpportunityStatisticsParams(): apiModels.OpportunityStatisticsParams {
    return {
      limit: 100,
      orderBy: faker.random.arrayElement(['asc, desc']),
      otherparams: this.getStatisticsDetailsParams(),
    };
  }

  static getStatisticsDetailsItem(num: number): apiModels.StatisticsDetailsItem[] {
    return Array(num).fill({
      industry: faker.random.word(),
      total: 99999,
      inProgress: 33333,
      won: 33333,
      lost: 33333,
      totalValue: faker.random.number({ max: 9999999999 }),
      inProgressValue: faker.random.number({ max: 9999999999 }),
      wonValue: faker.random.number({ max: 9999999999 }),
      lostValue: faker.random.number({ max: 9999999999 }),
      currency: faker.finance.currencyCode(),
    });
  }

  static getStatisticsDetailsResponse(num?: number): apiModels.StatisticsDetailsResponse {
    return {
      data: {
        items: this.getStatisticsDetailsItem(num ?? 1),
      },
    };
  }
}

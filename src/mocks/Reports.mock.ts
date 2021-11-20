import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ReportsMock {
  static getSelectedFilters(): apiModels.SelectedFilters {
    return {
      selectStage: Array(5).fill(faker.random.word()),
      selectOppRecordType: Array(5).fill(faker.random.word()),
      selectForecastCategory: Array(5).fill(faker.random.word()),
      selectCloseDate: Array(5).fill(faker.random.word()),
    };
  }

  static getCustomerFilters(): apiModels.CustomerFilters {
    return {
      area: Array(5).fill(faker.random.word()),
      productFamily: Array(5).fill(faker.random.word()),
      industry: Array(5).fill(faker.random.word()),
      includeAddresses: faker.random.boolean(),
      includeContacts: faker.random.boolean(),
    };
  }
}

import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ForeCastsInfoMock {
  static getForeCastInfo(num: number): apiModels.ForeCastInfo[] {
    return Array(num).fill({
      forecastCategory: faker.random.word(),
      description: faker.lorem.paragraph(1),
    });
  }

  static getForeCastInfoResponse(num?: number): apiModels.ForeCastInfoResponse {
    return {
      data: {
        items: this.getForeCastInfo(num ?? 1),
      },
    };
  }
}

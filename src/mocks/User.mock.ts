import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export class UserMock {
  static getUserInfo(): apiModels.UserItem {
    return {
      user: faker.name.findName(),
      text: faker.name.firstName(),
      handler: faker.name.findName(),
      description: `${faker.name.firstName(7)} ${faker.name.lastName}`,
      language: faker.random.alphaNumeric(7),
      selectedCompany: faker.random.alphaNumeric(2),
    };
  }
}

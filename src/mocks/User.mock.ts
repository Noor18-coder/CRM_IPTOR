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

  static getUsers(num: number): apiModels.UserItem[] {
    return Array(num).fill({
      user: faker.name.findName(),
      text: faker.name.firstName(),
      handler: faker.name.findName(),
      description: `${faker.name.firstName(7)} ${faker.name.lastName}`,
      language: faker.random.alphaNumeric(7),
      selectedCompany: faker.random.alphaNumeric(2),
    });
  }

  static getUserId(): string {
    return faker.internet.userName();
  }

  static getUserParams(): apiModels.UserParams {
    return {
      user: faker.internet.userName(),
    };
  }

  static getUserResponse(): apiModels.UserResponse {
    return {
      IptorAPI: faker.random.word(),
      data: this.getUserInfo(),
      id: faker.random.uuid(),
    };
  }

  static getUsersParams(): apiModels.UsersParams {
    return {
      freeTextSearch: faker.random.word(),
      offset: 0,
      limit: 100,
    };
  }

  static getUsersResponse(num?: number): apiModels.UsersResponse {
    return {
      data: {
        items: this.getUsers(num ?? 1),
      },
    };
  }
}

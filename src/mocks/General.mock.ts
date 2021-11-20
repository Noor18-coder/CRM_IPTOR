import * as faker from 'faker/locale/en_US';

export default class GeneralMock {
  static get uuid(): string {
    return faker.random.uuid();
  }
}

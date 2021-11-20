import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class NotesMock {
  static getAddNotesRequestParam(): apiModels.AddNotesRequestParam {
    return {
      parentFile: faker.random.word().toUpperCase(),
      parentId: faker.random.uuid(),
      text: faker.lorem.paragraph(1),
    };
  }

  static getAddNotesResponse(): apiModels.AddNotesResponse {
    return {
      nodeId: faker.random.uuid(),
    };
  }
}

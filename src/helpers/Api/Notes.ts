import axios from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export class Notes {
  /** API Method */
  private static addNoteMethod = 'mopNote.add';

  static async addNote(_params: apiModels.AddNotesRequestParam): Promise<apiModels.AddNotesResponse> {
    const requestData = new ApiRequest<apiModels.AddNotesRequestParam>(this.addNoteMethod, {
      parentFile: _params.parentFile,
      parentId: _params.parentId,
      text: _params.text,
    });
    const response = await axios.post<any>('/api/service', requestData);
    return get(response, 'data', {});
  }
}

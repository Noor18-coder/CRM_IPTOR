import axios, { AxiosResponse } from 'axios';
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
    const response = await axios.post<apiModels.AddNotesResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AddNotesResponse>, 'data', apiModels.AddNotesResponse>(response, 'data', {} as apiModels.AddNotesResponse);
  }
}

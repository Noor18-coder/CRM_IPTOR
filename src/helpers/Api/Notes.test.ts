import axios from 'axios';
import { Notes } from './Notes';
import { ApiRequest } from './ApiRequest';
import NotesMock from '../../mocks/Notes.mock';
import * as apiModels from './models';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Notes', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should add note', async () => {
    const params = NotesMock.getAddNotesRequestParam();
    const responseData = NotesMock.getAddNotesResponse();
    const requestData = new ApiRequest<apiModels.AddNotesRequestParam>('mopNote.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Notes.addNote(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});

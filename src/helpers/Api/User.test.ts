import { User } from './User';
import { UserItem, UserParams, UserResponse } from './models';
import axios from 'axios';
import {UserMock} from '../../mocks/User.mock';
import { ApiRequest } from './ApiRequest';

const userInfoMock = UserMock.getUserInfo();


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CustomerDefault', () => {
    let data: UserResponse;

    beforeAll(() => {
        data = {
            IptorAPI: '1.0',
            id: 'kdkdikd',
            data: {
                items: userInfoMock
            }
        };
    });

    afterEach(() => {
        mockedAxios.post.mockClear();
    });

    it('should return array business partner object when searched', async () => {
        const requestData = new ApiRequest<UserParams>(
            'user.get',
            { user: 'BM5157614' }
        );

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: data }));
        const obj = userInfoMock;

        const user = await User.get('BM5157614');
        expect(user.items).toBe(obj);
        expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
    });
});
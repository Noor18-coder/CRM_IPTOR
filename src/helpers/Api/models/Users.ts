import { UserItem } from './UserItem';

export type UsersParams = Record<string, any>;

export interface UsersResponseData {
  items: UserItem[];
}
export interface UsersResponse {
  data: UsersResponseData;
}

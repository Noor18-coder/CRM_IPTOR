import { UserItem } from './UserItem';

export type UsersParams = Record<string, any>;

export interface UsersResponse {
  items: UserItem[];
}

import { CompanyInfoItem } from './CompanyInfo';

export interface UserItem {
  user: string;
  handler: string;
  text: string;
  description: string;
  language?: string;
  currentEnvironment?: CompanyInfoItem[];
  selectedCompany: string;
  role?: string;
}

export interface UserParams {
  user?: string;
}

export interface UserResponse {
  IptorAPI: string;
  data: {
    items: UserItem;
  };
  id: string;
}

export interface UserProfileResponse {
  data: {
    user: string;
    text: string;
  };
}

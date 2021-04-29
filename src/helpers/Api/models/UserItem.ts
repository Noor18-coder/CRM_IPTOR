import { CompanyInfoItem } from "./CompanyInfo";

export interface UserItem {
  user: string;
  handler: string;
  defaultSalesOrderType: string;
  description: string;
  language: string;
  currentEnvironment?: CompanyInfoItem;
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
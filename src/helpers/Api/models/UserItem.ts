import { CompanyInfoItem, CompanyInfoRes} from "./CompanyInfo";

export interface UserItem {
  user: string;
  handler: string;
  defaultSalesOrderType: string;
  text:string;
  description: string;
  language: string;
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

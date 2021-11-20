import { CompanyInfoItem } from './CompanyInfo';

export interface UserItem {
  user: string;
  handler: string;
  text: string;
  description: string;
  language?: string;
  currentEnvironment?: CompanyInfoItem[];
  selectedCompany?: string;
  role?: string;
  status?: boolean;
  connectedGroupProfile?: string;
  groupProfile?: boolean;
  interactiveProcessingOk?: boolean;
  defaultEnquiryStdSystemUnit?: string;
  defaultEnquiryStdSystemUnitP?: string;
  disPeriodChangeAllowed?: boolean;
  defaultSalesOrderType?: string;
  defaultOrderTypeReq?: string;
  EMAIL?: string[];
  MANAGER?: string;
  PHONE?: string[];
  ROLE?: string;
}

export interface UserParams {
  user?: string;
}

export interface UserResponse {
  IptorAPI: string;
  data: UserItem;
  id: string;
}

export interface UserProfileResponse {
  data: {
    user: string;
    text: string;
  };
}

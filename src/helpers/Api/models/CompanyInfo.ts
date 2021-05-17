export interface CompanyInfoItem {
  companyCode : string,
  companyShortName : string,
  name : string, 
  selected: boolean
}; 

export interface CompanyInfoRes {
  items:CompanyInfoItem[]
}

export interface CompanyInfoItemResponse {
  IptorAPI: string;
  items: CompanyInfoItem[];
  id: string;
}
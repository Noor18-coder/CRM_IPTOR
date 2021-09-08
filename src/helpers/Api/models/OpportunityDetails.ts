import { Product } from './Product';
import { OpportunityContact } from './Contacts';
import { ApprovalLogsDefault, InitiateSubmitApprovalPopupData } from './Approvals';

export interface OpportunityDetailsDefault {
  opportunityId: string;
  desc: string;
  customer: string;
  customerType?: number;
  customerName: string;
  handler: string;
  salesman?: string;
  area: string;
  stage: string;
  probability?: number;
  reason?: string;
  estimatedValue?: number;
  currentValue?: number;
  currency: string;
  activ?: boolean;
  endDate: string;
  authority?: boolean;
  oppRecordType: string;
  logExist?: boolean;
  noteExist?: boolean;
  contactExist?: boolean;
  taskExist?: boolean;
  itemExist?: boolean;
  attributeExist?: boolean;
  totalOpportunityValue?: number;
  totalOpportunityCost?: number;
  totalPsValue?: number;
  totIncrementalOppValue?: number;
  totalOpportunityNetValue?: number;
  defaultApprover?: string;
  approvalRequired?: boolean;
  approver?: string;
  level?: number;
  approvalStatus?: string;
}

export interface OpportunityDetailsGroupItem {
  parentFile?: string;
  parentId?: string;
  attributeType: string;
  rootId?: string;
  group: string;
  valueId?: string;
  attributeValue: string;
  description: string;
}

export interface OpportunityDetailsBasicInfo {
  attributeValue: string;
  description: string;
}

export interface OpportunityInfoDetails {
  contactInfo: OpportunityContact[];
  productInfo: Product[];
}

export interface OpportunityDetailsParams {
  opportunityId: string;
}

export interface OpportunityDetailsGroupItemParams {
  parentFile: string;
  parentId: string;
}

export interface OpportunityDetailsGroupItemResponse {
  data: OpportunityDetailsDefault;
}

export interface OpportunityDetailsDefaultResponse {
  data: {
    items: OpportunityDetailsGroupItem[];
  };
}

export interface IStringList {
  [index: string]: OpportunityDetailsGroupItem[];
}

export interface OpportunityMoreInfoSection {
  title: string;
  data: IStringList;
}

export interface OpportunityEditOptions {
  allowEdit?: boolean;
  open?: boolean;
  groupName?: string;
  data?: Product;
  action?: string;
  approvalHistory?: any;
  submitApprovalData?: InitiateSubmitApprovalPopupData;
  subGroupName?: string;
}

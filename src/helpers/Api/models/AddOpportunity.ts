import { ErrorMessage } from './Approvals';

export interface AddOpportunityDefaultParams {
  opportunityId?: string;
  area?: string;
  handler?: string;
  reason?: string;
  endDate?: string;
  probability?: number;
  oppRecordType?: string;
  estimatedValue?: number;
  stage?: string;
  mustYN?: string;
  salesman?: string;
  currency?: string;
  tempId?: string;
  startDate?: string;
  desc?: string;
  customer?: string;
  customerName?: string;
  activ?: boolean;
  userId?: string;
  forecastCategory?: string;
}

export interface AddOpportunityResponse {
  data: {
    opportunityId: string;
  };
  error?: string;
  messages?: ErrorMessage[];
}

export interface UpdateOpportunityResponse {
  data: {
    approver?: string;
    approvalStatus?: string;
    minimumStage?: string;
  };
  error?: string;
  messages?: ErrorMessage[];
}

export interface AddCustomerContactRequestParams {
  contactParentFile?: string;
  contactParentId?: string;
  contactPerson?: string;
  contactDC?: string;
  whatsApp?: string;
  phone?: number;
  mobile?: string;
  linkedin?: string;
  fax?: string;
  email?: string;
}

export interface AddCustomerContactResponseParams {
  contactParentFile: string;
  contactParentId: string;
  contactPerson: string;
  contactId: string;
  contactDC: string;
  whatsApp: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
  rootId: string;
  error: boolean;
}

export interface AddCustomerContactParams {
  contactParentId?: string;
  contactPerson?: string;
  phone?: number;
  mobile?: string;
  linkedin?: string;
  fax?: string;
  email?: string;
  contactDC?: string;
}

export interface AddOpportunityField {
  description: string;
  valueFormatDesc: string;
  attributeType: string;
  valueFormat: string;
  valuesExist?: boolean;
  reduxKey?: string;
  asyncSearch?: boolean;
  dateInput?: boolean;
  disabled?: boolean;
}

export interface DeleteCustomerContactParams {
  contactParentFile: string;
  contactParentId: string;
  contactId: string;
}

export interface DeleteOpportunityItemParams {
  itemId: string;
  parentFile?: string;
  parentId: string;
}

export interface AddOpportunityAddItemsActionParams {
  opportunityId: string;
  item: string;
  quantity: number;
  unit: string;
}

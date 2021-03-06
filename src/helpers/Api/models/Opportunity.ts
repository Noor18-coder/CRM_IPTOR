export interface OpportunityListItem {
  name: string;
  opportunityId: string;
  desc: string;
  customer: string;
  handler: string;
  salesman: string;
  area: string;
  stage: string;
  probability: number;
  reason: string;
  estValue: number;
  curValue: number;
  currency: string;
  activ: boolean;
  endDate: Date;
  rootId: string;
  authority: boolean;
  oppRecordType: string;
  logExist: boolean;
  noteExist: boolean;
  contactExist: boolean;
  taskExist: boolean;
  itemExist: boolean;
  attributeExist: boolean;
  forecastCategory: string;
  approver: string;
  estValueSys: number;
  exchangeRate: number;
  approvalStatus: string;
  userId: string;
}

export interface OpportunityListParams {
  selectUserId?: string;
  selectHandler?: string;
  selectCloseDateFrom?: string;
  selectCloseDateTo?: string;
  selectStageFrom?: string;
  selectStageTo?: string;
  searchField?: string;
  selectOppRecordType?: string;
  selectCustomer?: string;
  selectApprover?: string;
  selectApprovalStatus?: string;
  activeOp?: boolean;
}

export interface OpportunityFilterItem {
  value: string;
  selectParam: string;
}

export interface OpportunityListResponse {
  data: {
    control?: {
      more: boolean;
    };
    data: {
      items: OpportunityListItem[];
    };
  };
}

export interface OpportunityListApiMethodParams {
  limit?: number;
  offset?: number;
  orderBy?: string;
  otherparams?: OpportunityListParams;
}

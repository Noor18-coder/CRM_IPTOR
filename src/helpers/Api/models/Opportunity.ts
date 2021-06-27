export interface OpportunityListItem {
  name: string,
  opportunityId: string,
  desc: string,
  customer: string,
  handler: string,
  salesman: string,
  area: string,
  stage: string,
  probability: number,
  reason: string,
  estValue: number,
  curValue: number,
  currency: string,
  activ: boolean,
  endDate: Date,
  rootId: string,
  authority: boolean,
  oppRecordType: string,
  logExist: boolean,
  noteExist: boolean,
  contactExist: boolean,
  taskExist: boolean,
  itemExist: boolean,
  attributeExist: boolean
}

export interface OpportunityListParams {
  handler: string;
  selectHandler?: string
}

export interface OpportunityListResponse {
  data: {
    control?: {
      more: boolean
    },
    data: {
      items: OpportunityListItem[]
    }
  }
}
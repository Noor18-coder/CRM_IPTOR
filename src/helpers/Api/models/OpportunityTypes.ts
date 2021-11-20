export interface OpportunityType {
  oppRecordType: string;
  description: string;
  MANDATORY_FIELDS: string[];
  OPTIONAL_FIELDS: string[];
}

export interface OpportunityTypeResponse {
  data: {
    items: OpportunityType[];
  };
}

export interface DefaultOpportunityInfo {
  currentDate?: string;
  language?: string;
  user?: string;
  currencyLDA?: string;
  stageCreated?: string;
}

export interface DefaultOpportunityInfoResponse {
  data: DefaultOpportunityInfo;
}

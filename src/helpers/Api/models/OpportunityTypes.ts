export interface OpportunityType {
  oppRecordType: string;  
  description: string;
  MANDATORY_FIELDS: string[];
  OPTIONAL_FILEDS: string[];
}


export interface OpportunityTypeResponse {
  data: {
    data: {
      items: OpportunityType[]
    }
  }
}

export interface DefaultOpportunityInfo {
    currentDate?: string,
    language?: string,
    user?: string,
    currencyLDA?: string
}

export interface DefaultOpportunityInfoResponse {
    data: DefaultOpportunityInfo
}

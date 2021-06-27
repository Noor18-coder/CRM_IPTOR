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

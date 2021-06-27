
export interface OpportunityContact {
contactId : string;
contactParentFile : string;
contactParentId : string;
rootId : string;
contactPerson : string;
contactDC : string;
email : string;
phone : string;
noteExist : boolean;
existDC : boolean;
isEditable : boolean;
attributeExist : boolean;
domainTrans: string;
visitingAddress?: string;
role?: string;
}

export interface OpportunityContactsParams {
  rootId : string;
}

export interface OpportunityContactsResponse {
  data: {
    items: OpportunityContact[]
    }
}
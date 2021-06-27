export interface AddOpportunityDefaultParams {
    area?: string;
    handler?: string;
    reason?: string;
    endDate?: string;
    probability?: string;
    oppRecordType?: string;
    estimatedValue?: string;
    stage?: string;
    mustYN?: string;
    salesman?: string;
    currency?: string;
    tempId?: string;
    startDate?: string;
    desc?: string;
    customer?: string;
}


export interface AddOpportunityResponse {
    data : {
        opportunityId:string
    }
}

export interface AddCustomerContactRequestParams {
    contactParentFile?:string;
    contactParentId?:string;
    contactPerson?:string
    contactDC:string;
    whatsApp:string;
    phone:number;
    mobile:string;
    linkedin:string;
    fax:string;
    email:string
}


export interface AddCustomerContactResponseParams {
    contactParentFile:string;
    contactParentId:string;
    contactPerson:string;
    contactId:string;
    contactDC:string;
    whatsApp:string;
    phone:string;
    mobile:string;
    fax:string;
    email:string;
    rootId:string;
    error:boolean;
}


export interface AddCustomerContactParams {
    contactPArentId?:string;
    contactPerson?:string
    phone:number;
    mobile:string;
    linkedin:string;
    fax:string;
    email:string
};

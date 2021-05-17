export interface OpportunityDetailsDefault {
    opportunityId: string,
    desc: string,
    customer: string,
    customerType: number,
    customerName: string,
    handler: string,
    salesman: string,
    area: string,
    stage: string,
    probability: number,
    reason: string,
    estimatedValue: number,
    currentValue: number,
    currency: string,
    activ: boolean,
    endDate: string,
    authority: boolean,
    oppRecordType: string,
    logExist: boolean,
    noteExist: boolean,
    contactExist: boolean,
    taskExist: boolean,
    itemExist: boolean,
    attributeExist: boolean,
    totalOpportunityValue:number,
    totalOpportunityCost:number,
    totalPsValue: number,
    totIncrementalOppValue: number,
    totalOpportunityNetValue: number
   
};

export interface OpportunityDetailsGroupItem {
  parentFile: string;
  parentId: string;
  attributeType: string,
  rootId: string,
  group: string,
  valueId: string,
  attributeValue: string,
  description:string
};

  
export interface OpportunityDetailsParams {
  opportunityId: string
}
  
  export interface OpportunityDetailsGroupItemParams {
    parentFile: string, 
    parentId: string
  }

  export interface OpportunityDetailsGroupItemResponse {
    data: OpportunityDetailsDefault
 }
  
  export interface OpportunityDetailsDefaultResponse {
     data:{
       items: OpportunityDetailsGroupItem[]
     } 
  }

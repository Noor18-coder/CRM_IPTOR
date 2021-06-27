export interface CustomerDetailsDefault {
    businessPartner: number,
    internalName: string,
    type: number,
    name: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    addressLine4: string,
    postalCode: string,
    country: string,
    area:string,
    language: string,
    invoiceCustomer: number,
    debtorAddressNumber: number,
    debtor: number,
    invoiceAddressNumber: number,
    currency: string
    isParent: boolean,
    active: boolean,
    numberOfActiveOpportunities: number,
    numberOfInactiveOpportunities: number,
    phone: string,
    subsidiaryEntities:[],
    APP_FROM_IPTOR:[],
    CURRENT_SYSTEM: string,
    CUST_CLASSIFICATION: string,
    CUSTOMER_AT_RISK: boolean,
    DC1_VERSION: [],
    DO_NOT_CONTACT: boolean,
    GLOBAL_PARENT: number,
    IBS_ASW_RELEASE: number,
    INDUSTRY: string,
    OWNER_ID: string,
    PERP_USE_MAINT_CONV: boolean,
    REFERENCEABLE: boolean,
    TYPE:[]   
};

export interface CustomerDetailsParams {
    businessPartner: string
}

export interface CustomerDetailsDefaultResponse {
       data: CustomerDetailsDefault[]  
}

export interface  CustomerDetailsGroupItem {
    parentFile: string;
    parentId: string;
    attributeType: string,
    rootId: string,
    group: string,
    valueId: string,
    attributeValue: string,
    description:string
};

export interface  CustomerDetailsContactsGroupItem {
  contactId: number,
  contactPerson: string,
  email: string,
  phone: number,
  fax: string,
  businessPartner: number,
  role: string
};

  export interface CustomerDetailsItemParams {
    parentFile: string, 
    parentId: string
  }
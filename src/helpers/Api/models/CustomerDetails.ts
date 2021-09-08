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


export interface  CustomerDetailsContactsGroupItem {
  contactId: string,
  contactDC: string,
  contactPerson: string,
  email: string,
  phone: number,
  fax: string,
  businessPartner: number,
  role: string,
  ADDRESS: string,
  ADDRESS_2: string,
  DO_NOT_CONTACT: boolean,
  NO_LONGER_AT_COMP: boolean,
  OPTED_OUT_OF_EMAIL: boolean,
  PRIMARY_CONTACT: boolean,
  mobile ?:string,
  linkedin ?:string,
  ACTIVE: boolean
};

export interface CustomerDetailsContactsGroupItemResponse {
    data: CustomerDetailsContactsGroupItem[]
}

export interface CustomerDeleteParams {
    businessPartner: string,
    contactDC: string
}

export interface CustomerDeleteResponse {
    data: CustomerDeleteParams
}

export interface  CrmCountry {
  country: string,
  description: string,
  ISOcountry: string,
  validateState: number,
  validateCounty: number
};

export interface CrmCountryParams {
  country: string
}

export interface  Area {
 area:string,
 description:string
};

export interface AreaParams {
  area: string
}
  export interface  CrmUserDetails {
    user: string,
    description: string,
    status: boolean,
    groupProfile: boolean,
    interactiveProcessingOk: boolean,
    defaultEnquiryStdSystemUnit: string,
    defaultEnquiryStdSystemUnitP: string,
    disPeriodChangeAllowed: boolean,
    handler: string,
    defaultOrderTypeReq: string,
    EMAIL: [],
    MANAGER: string,
    PHONE: [],
    ROLE: string
  }
  
    export interface CrmUserDetailsParams {
      user: string
  }
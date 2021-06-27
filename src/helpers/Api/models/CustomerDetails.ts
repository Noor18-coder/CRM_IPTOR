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

  export interface CustomerDetailsItemParams {
    parentFile: string, 
    parentId: string
  }
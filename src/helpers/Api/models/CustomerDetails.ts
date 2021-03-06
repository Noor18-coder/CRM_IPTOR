import { AttributeValueObject } from './Attributes';

export interface CustomerDetailsDefault {
  businessPartner: number;
  internalName: string;
  type: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  postalCode: string;
  country: string;
  area: string;
  language: string;
  invoiceCustomer: number;
  debtorAddressNumber: number;
  debtor: number;
  invoiceAddressNumber: number;
  currency: string;
  isParent: boolean;
  active: boolean;
  numberOfActiveOpportunities: number;
  numberOfInactiveOpportunities: number;
  phone: string;
  subsidiaryEntities: [];
  productFamily: [];
  CURRENT_SYSTEM: string;
  CUST_CLASSIFICATION: string;
  CUSTOMER_AT_RISK: boolean;
  DC1_VERSION: [];
  DO_NOT_CONTACT: boolean;
  GLOBAL_PARENT: number;
  IBS_ASW_RELEASE: number;
  industry: string;
  owner: string;
  PERP_USE_MAINT_CONV: boolean;
  REFERENCEABLE: boolean;
  TYPE: [];
}

export interface CustomerDetailsDefaultFields {
  businessPartner?: number;
  internalName?: string;
  type?: number;
  name?: string;
  addressLine1?: string;
  country?: string;
  area?: string;
  active?: boolean;
  phone?: string;
  industry?: string;
  owner?: string;
}

export interface CustomerDetailsParams {
  businessPartner: string;
}

export interface ViewCustomerDetailsParams {
  contactDC: string;
}

export interface CustomerDetailsDefaultResponse {
  data: CustomerDetailsDefault[];
}

export interface ViewCustomerDetailsContactsItemResponse {
  data: CustomerDetailsContactsGroupItem[];
}

export interface CustomerDetailsContactsGroupItem {
  contactId: string;
  contactDC: string;
  contactPerson: string;
  email: string;
  phone: number;
  fax: string;
  businessPartner: number;
  role: string;
  ADDRESS: string;
  ADDRESS_2: string;
  DO_NOT_CONTACT: boolean;
  NO_LONGER_AT_COMP: boolean;
  OPTED_OUT_OF_EMAIL: boolean;
  PRIMARY_CONTACT: boolean;
  mobile?: string;
  linkedin?: string;
  ACTIVE: boolean;
  itemId: string;
  itemDescription: string;
  parentFile: string;
  parentId: string;
  rootId: string;
  lineNumber: string;
  item: string;
  ourPrice: number;
  systemPrice: number;
  existsInItemFile: boolean;
  price: boolean;
  unit: string;
  quantity: number;
  hasNote: boolean;
  hasContact: boolean;
  hasAttribute: boolean;
  attributes?: AttributeValueObject[];
  CONTACT_TYPE: string;
  CONTACT_UNTIL: string;
  DESCRIPTION: string;
}

export interface CustomerDetailsContactsGroupItemResponseData {
  items: CustomerDetailsContactsGroupItem[];
}

export interface CustomerDetailsContactsGroupItemResponse {
  data: CustomerDetailsContactsGroupItemResponseData;
}

export interface CustomerDeleteParams {
  businessPartner: string;
  contactDC: string;
}

export interface CustomerDeleteResponse {
  data: CustomerDeleteParams;
}

export interface CrmCountry {
  country: string;
  description: string;
  ISOcountry: string;
  validateState: number;
  validateCounty: number;
}

export interface CrmCountryResponseData {
  items: CrmCountry[];
}

export interface CrmCountryResponse {
  data: CrmCountryResponseData;
}

export interface CrmCountryParams {
  country: string;
}

export interface Area {
  area: string;
  description: string;
}

export interface AreaResponseData {
  items: Area[];
}

export interface AreaResponse {
  data: AreaResponseData;
}

export interface AreaParams {
  area: string;
}
export interface CrmUserDetails {
  user: string;
  description: string;
  status: boolean;
  groupProfile: boolean;
  interactiveProcessingOk: boolean;
  defaultEnquiryStdSystemUnit: string;
  defaultEnquiryStdSystemUnitP: string;
  disPeriodChangeAllowed: boolean;
  handler: string;
  defaultOrderTypeReq: string;
  EMAIL: [];
  MANAGER: string;
  PHONE: [];
  ROLE: string;
}

export interface CrmUserDetailsResponse {
  data: CrmUserDetails;
}

export interface CrmUserDetailsParams {
  user: string;
}

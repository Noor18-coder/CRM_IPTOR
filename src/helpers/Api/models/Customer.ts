export interface AddressesList {
  address: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressLine4: string;
  postalCode: number;
  country: string;
  isDispatchAddress: boolean;
  isConfirmationAddress: boolean;
  isInvoiceAddress: boolean;
  isDebtorAddress: boolean;
  isPurchaseOrderAddress: boolean;
  isPayeeAddress: boolean;
  isSupplierDispatchAddress: boolean;
  isMsdsAddress: boolean;
  isDirectDeliveryPreferred: boolean;
  isDEAAddress: boolean;
  isValidAsShipToAddress: boolean;
}

export interface CustomerContactsList {
  contactDC: string;
  contactPerson: string;
  isPublicContact: true;
  userID: string;
  phone: string;
  email: string;
  fax: string;
  DO_NOT_CONTACT: boolean;
  NO_LONGER_AT_COMP: boolean;
  OPTED_OUT_OF_EMAIL: boolean;
  PRIMARY_CONTACT: boolean;
  TITLE: string;
}

export interface BusinessPartnerListItem {
  businessPartner: string;
  description: string;
  type: number;
  internalName: string;
  area: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  country: string;
  creationDate: Date;
  postalCode: string;
  phone: number;
  industry: string;
  owner: string;
  numberOfActiveOpportunities: number;
  active: boolean;
  addresses: AddressesList[];
  contacts: CustomerContactsList[];
}

export interface BusinessPartnerListParams {
  businessPartnerTextSearch?: string;
  searchField?: string;
  includeInactive?: boolean;
  crmAttributesTextSearch?: string;
  industry?: string | string[];
  area?: string | string[];
  productFamily?: string | string[];
  includeAddresses?: boolean;
  includeContacts?: boolean;
  active?: boolean;
}

export interface BusinessPartnerFilterItem {
  value: string;
  selectParam: string;
}

export interface BusinessPartnerListResponse {
  control?: {
    total: number;
  };
  data: {
    items: BusinessPartnerListItem[];
  };
}

export interface AreaListItem {
  area: string;
  description: string;
}

export interface AreaListParams {
  area?: string;
  description?: string;
}

export interface AreaListResponse {
  data: {
    items: AreaListItem[];
  };
}

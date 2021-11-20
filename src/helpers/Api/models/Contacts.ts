import { AttributeValueObject } from './Attributes';

export interface OpportunityContact {
  contactId: string;
  contactParentFile: string;
  contactParentId: string;
  rootId: string;
  contactPerson: string;
  contactDC: string;
  email: string;
  phone: string;
  noteExist: boolean;
  existDC: boolean;
  isEditable: boolean;
  attributeExist: boolean;
  domainTrans: string;
  visitingAddress?: string;
  role?: string;
}

export interface ContactInfo {
  contactPerson: string;
  contactDC: string;
  whatsApp?: string;
  phone: number;
  mobile?: string;
  linkedin?: string;
  fax?: string;
  email: string;
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
}

export interface OpportunityContactsParams {
  rootId: string;
}

export interface OpportunityContactsResponse {
  data: {
    items: OpportunityContact[];
  };
}

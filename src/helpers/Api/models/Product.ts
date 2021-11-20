import { AttributeValueObject } from './Attributes';

export interface Product {
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
  contactPerson: string;
  contactDC: string;
  whatsApp?: string;
  phone: number;
  mobile?: string;
  linkedin?: string;
  fax?: string;
  email: string;
}

export interface ProductParams {
  rootId: string;
}

export interface ProductResponse {
  data: {
    items: Product[];
  };
}

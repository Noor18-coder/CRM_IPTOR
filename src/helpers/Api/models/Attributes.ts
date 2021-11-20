export interface AttributeField {
  parentFile: string;
  attributeType: string;
  description: string;
  preloaded: boolean;
  allowCopy: boolean;
  valueFormat: string;
  valueFormatDesc: string;
  attributeId: string;
  validate: boolean;
  uniqueRecord: boolean;
  statement: string;
  sequence: number;
  group: string;
  initializeAttribute: boolean;
  initialValueN: number;
  protectData: boolean;
  valuesExist: boolean;
}

export interface AttributeFormField {
  parentFile: string;
  attributeType: string;
  description: string;
  preloaded: boolean;
  allowCopy: boolean;
  valueFormat: string;
  valueFormatDesc: string;
  attributeId: string;
  validate: boolean;
  uniqueRecord: boolean;
  statement: string;
  sequence: number;
  group: string;
  initializeAttribute: boolean;
  initialValueN: number;
  protectData: boolean;
  valuesExist: boolean;
  attributeValue?: string;
  attributeValueD?: string;
  attributeValueB?: boolean;
  attributeValueA?: string;
  id?: string;
  valueId?: string;
  error?: string;
  mandatoryField?: boolean;
}

export interface AttributeParams {
  parentFile: string;
  attributeType?: string;
}

export interface AttributeResponseData {
  items: AttributeField[];
}

export interface AttributeResponse {
  data: AttributeResponseData;
}

export interface IAttributesList {
  group: string;
  items: AttributeField[];
}

export interface AttributeValueObject {
  parentFile: string;
  parentId: string;
  attributeType: string;
  rootId: string;
  group: string;
  valueId: string;
  attributeValue?: string;
  attributeValueD?: string;
  attributeValueB?: boolean;
  attributeValueA?: string;
  description: string;
}

export interface AttributeValuesResponse {
  data: {
    items: AttributeValueObject[];
  };
}

export interface SaveAttributeFieldParam {
  parentFile?: string;
  parentId?: string;
  attributeType: string;
  attributeValue?: string | number;
  valueId?: string;
  attributeValueD?: string | number | boolean;
  attributeValueB?: string | boolean;
  attributeValueA?: string;
  id?: string;
  valueFormat?: string;
}

export interface UpdateAttributeParams {
  attributeType: string;
  attributeValue: string | number;
  valueId: string;
}

export interface AttributeValueAndType {
  attributeType: string;
  attributeValue: string | number;
}

export interface AttributesValuesRequestParam {
  parentFile?: string;
  parentId?: string;
}

export interface AttributeValuesRequestParam {
  attributeId: string;
}

export interface DeleteAttributeMethodParams {
  valueId: string;
}

export interface UpdateAttributeParamsMethodParams {
  businessPartnerId: string;
  attributeType: string;
  attributeValue: string | number;
  valueId: string;
  type?: string;
}

export interface AddAttributesMethodParams {
  fileName: string;
  parentId: string;
  attributeType: string;
  attributeValue: string | number;
  attributeValueB?: boolean;
  attributeValueD?: string;
}

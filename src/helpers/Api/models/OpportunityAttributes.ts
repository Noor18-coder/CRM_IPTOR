export interface UserDefinedFieldReduxParams {
  attributeType: string;
  attributeValue: string | number;
  attributeValueD?: string;
  valueFormat?: string;
}

export interface UserDefinedField {
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
  valueId?: string;
  readOnly?: boolean;
  error?: string;
  id?: string;
}

export interface UserDefinedFieldParam {
  parentFile: string;
  attributeType: string;
}

export interface SaveUserDefinedFieldParam {
  parentFile: string;
  parentId: string;
  attributeType: string;
  attributeValue?: string | number;
  attributeValueD?: string | number;
}

export interface AddAttributesThunkActionParams {
  businessPartnerId: string;
  attributeType: string;
  attributeValue: string | number;
  type?: string;
}

export interface AddOpportunityAttributesParams extends Omit<AddAttributesThunkActionParams, 'businessPartnerId' | 'type'> {
  opportunityId: string;
  attributeType: string;
  attributeValue: string | number;
}

export interface UserDefinedFieldValuesParams {
  attributeId: string;
}

export interface DropDownValue {
  valueField: string;
  fieldDescription: string;
}

export interface UserDefinedFieldValuesResponse {
  data: {
    items: DropDownValue[];
  };
}

export interface DropDownValues {
  attributeId: string;
  values: DropDownValue[];
}

export interface UserDefinedFieldsValueDropDown {
  data: DropDownValues[];
}

export interface UserDefinedFieldSaveParams {
  attributeType: string;
  parentFile: string;
  parentId: string;
  attributeValue: string | number;
}

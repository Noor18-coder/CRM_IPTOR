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

export interface AttributeParams {
    parentFile: string;
    attributeType?:string;
}

export interface AttributeResponse {
    data: AttributeField[]
}

export interface IAttributesList {
    group:string;
    items: AttributeField[]
}
  
export interface AttributeValueObject {
    parentFile: string;
    parentId :string;
    attributeType : string;
    rootId : string;
    group: string;
    valueId: string;
    attributeValue: string;
    description: string;
}

export interface AttributeValuesResponse {
    data:{
      items: AttributeValueObject[]
    } 
}

export interface SaveAttributeFieldParam {
    parentFile: string;
    parentId: string;
    attributeType: string;
    attributeValue: string | number;
    valueId: string;
}


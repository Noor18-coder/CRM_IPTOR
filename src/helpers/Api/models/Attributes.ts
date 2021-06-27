export interface AttributeField {
    parentFile: string,
    attributeType: string,
    description: string
    preloaded: boolean,
    allowCopy: boolean,
    valueFormat: string,
    valueFormatDesc: string,
    attributeId: string,
    validate: boolean,
    uniqueRecord: boolean,
    statement: string,
    sequence: number,
    group: string,
    initializeAttribute: boolean,
    initialValueN: number,
    protectData: boolean,
    valuesExist: boolean
}

export interface AttributeParams {
    parentFile: string;
    attributeType?:string;
}

export interface AttributeResponse {
    data :{
        items : AttributeField[]
    }
}

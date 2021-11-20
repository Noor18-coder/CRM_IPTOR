import * as faker from 'faker/locale/en_US';
import { isBoolean, isString } from 'lodash';
import * as apiModels from '../helpers/Api/models';
import { Constants } from '../config/Constants';
import ConfigMock from './Config.mock';

export default class AttributeMock {
  static getAttributeFormField(): apiModels.AttributeFormField {
    return {
      parentFile: faker.random.word(),
      attributeType: faker.random.word(),
      description: faker.random.word(),
      preloaded: faker.random.boolean(),
      allowCopy: faker.random.boolean(),
      valueFormat: faker.random.word(),
      valueFormatDesc: faker.random.word(),
      attributeId: faker.random.word(),
      validate: faker.random.boolean(),
      uniqueRecord: faker.random.boolean(),
      statement: faker.random.word(),
      sequence: faker.random.number(99999),
      group: faker.random.word(),
      initializeAttribute: faker.random.boolean(),
      initialValueN: faker.random.number(99999),
      protectData: faker.random.boolean(),
      valuesExist: faker.random.boolean(),
      attributeValue: faker.random.word(),
      attributeValueD: faker.random.word(),
      attributeValueB: faker.random.boolean(),
      attributeValueA: faker.random.word(),
      id: faker.random.word(),
      valueId: faker.random.word(),
      error: faker.random.word(),
    };
  }

  static getAttributeFormFieldConstVal(): apiModels.AttributeFormField {
    return {
      parentFile: 'enterprise',
      attributeType: 'Automotive',
      description: 'Generic',
      preloaded: true,
      allowCopy: true,
      valueFormat: 'Granite',
      valueFormatDesc: 'Kentucky',
      attributeId: 'Awesome',
      validate: true,
      uniqueRecord: false,
      statement: 'generating',
      sequence: 79547,
      group: 'Brand',
      initializeAttribute: false,
      initialValueN: 32916,
      protectData: false,
      valuesExist: true,
      attributeValue: 'Generic',
      attributeValueD: 'copying',
      attributeValueB: false,
      attributeValueA: 'background',
      id: 'New',
      valueId: 'Security',
      error: 'array',
    };
  }

  static getUserDefinedFieldReduxParams(num: number): apiModels.UserDefinedFieldReduxParams[] {
    return Array(num).fill({
      attributeType: faker.random.word(),
      attributeValue: faker.helpers.randomize([faker.random.number({ max: 99999 }), faker.random.word()]),
      attributeValueD: faker.random.word(),
      valueFormat: faker.random.word(),
    });
  }

  static getAttributeValueObject(num: number): apiModels.AttributeValueObject[] {
    return Array(num).fill({
      parentFile: faker.random.word(),
      parentId: faker.random.word(),
      attributeType: faker.random.word(),
      rootId: faker.random.word(),
      group: faker.random.word(),
      valueId: faker.random.word(),
      attributeValue: faker.random.word(),
      attributeValueD: faker.random.word(),
      attributeValueB: faker.random.boolean(),
      attributeValueA: faker.random.word(),
      description: faker.random.word(),
    });
  }

  static getAttributeValuesResponse(num?: number): apiModels.AttributeValuesResponse {
    return {
      data: {
        items: this.getAttributeValueObject(num ?? 1),
      },
    };
  }

  static getAttributeField(num: number): apiModels.AttributeField[] {
    return Array(num).fill({
      parentFile: faker.random.word(),
      attributeType: faker.random.word(),
      description: faker.random.words(5),
      preloaded: faker.random.boolean(),
      allowCopy: faker.random.boolean(),
      valueFormat: faker.random.word(),
      valueFormatDesc: faker.random.word(),
      attributeId: faker.random.word(),
      validate: faker.random.boolean(),
      uniqueRecord: faker.random.boolean(),
      statement: faker.random.word(),
      sequence: faker.random.number({ max: 99 }),
      group: faker.random.word(),
      initializeAttribute: faker.random.boolean(),
      initialValueN: faker.random.number({ max: 99 }),
      protectData: faker.random.boolean(),
      valuesExist: faker.random.boolean(),
    });
  }

  static getAttributeResponse(num: number): apiModels.AttributeResponse {
    return {
      data: {
        items: this.getAttributeField(num),
      },
    };
  }

  static getUpdateAttributeParamsMethodParams(type?: string): apiModels.UpdateAttributeParamsMethodParams {
    return {
      businessPartnerId: faker.random.uuid(),
      attributeType: faker.random.word(),
      attributeValue: faker.random.arrayElement([faker.random.word(), faker.random.number({ max: 99999 })]),
      valueId: faker.random.uuid(),
      type,
    };
  }

  static getUpdateAttributeParams(
    businessPartnerId: string,
    attributeType: string,
    attributeValue: string | number,
    valueId: string,
    type?: string
  ): apiModels.SaveAttributeFieldParam {
    const params: apiModels.SaveAttributeFieldParam = {
      attributeType,
      parentFile: Constants.CUSTOMER_PARENT_FILE,
      parentId: businessPartnerId,
      attributeValue,
      valueId,
    };

    if (type === 'date') {
      delete params.attributeValue;
      params.attributeValueD = attributeValue;
    }

    return params;
  }

  static getSaveAttributeFieldParam(): apiModels.SaveAttributeFieldParam {
    return {
      parentFile: faker.random.word(),
      parentId: faker.random.uuid(),
      attributeType: faker.random.word(),
      attributeValue: faker.random.arrayElement([faker.random.word(), faker.random.number({ max: 99999 })]),
      valueId: faker.random.uuid(),
      attributeValueD: faker.random.arrayElement([faker.random.word(), faker.random.number({ max: 99999 }), faker.random.boolean()]),
      attributeValueB: faker.random.arrayElement([faker.random.word(), faker.random.boolean()]),
      attributeValueA: faker.random.word(),
      id: faker.random.uuid(),
      valueFormat: faker.random.word(),
    };
  }

  static getSaveAttributeFieldParamRequired(): Required<apiModels.SaveAttributeFieldParam> {
    return this.getSaveAttributeFieldParam() as Required<apiModels.SaveAttributeFieldParam>;
  }

  static getAttributeValuesRequestParam(): apiModels.AttributeValuesRequestParam {
    return {
      attributeId: faker.random.uuid(),
    };
  }

  static getUserDefinedFieldValuesResponse(num?: number): apiModels.UserDefinedFieldValuesResponse {
    return {
      data: {
        items: ConfigMock.getDropDownValue(num ?? 1),
      },
    };
  }

  static getaAdAttributesMethodParams(isAttributeValueB?: boolean, isAttributeValueD?: boolean): apiModels.AddAttributesMethodParams {
    let params: apiModels.AddAttributesMethodParams = {
      fileName: faker.random.word(),
      parentId: faker.random.uuid(),
      attributeType: faker.random.word(),
      attributeValue: faker.random.arrayElement([faker.random.word(), faker.random.number({ max: 99999 })]),
    };

    if (isBoolean(isAttributeValueB)) {
      params = { ...params, attributeValueB: true };
    }

    if (isBoolean(isAttributeValueD)) {
      params = { ...params, attributeValueD: faker.random.word() };
    }

    return params;
  }

  static getAddAttributesParams(
    fileName: string,
    parentId: string,
    attributeType: string,
    attributeValue: string | number,
    attributeValueB?: boolean,
    attributeValueD?: string
  ): apiModels.SaveAttributeFieldParam {
    const params: apiModels.SaveAttributeFieldParam = {
      attributeType,
      parentFile: fileName,
      parentId,
    };
    if (isBoolean(attributeValueB)) {
      params.attributeValueB = attributeValueB;
    } else if (isString(attributeValueD)) {
      params.attributeValueD = attributeValueD;
    } else {
      params.attributeValue = attributeValue;
    }

    return params;
  }

  static getAttributesValuesRequestParam(): Required<apiModels.AttributesValuesRequestParam> {
    return {
      parentFile: faker.random.word(),
      parentId: faker.random.uuid(),
    };
  }

  static getDeleteAttributeMethodParams(): apiModels.DeleteAttributeMethodParams {
    return {
      valueId: faker.random.uuid(),
    };
  }
}

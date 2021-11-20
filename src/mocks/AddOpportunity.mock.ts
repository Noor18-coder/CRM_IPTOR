import * as faker from 'faker/locale/en_US';
import { Constants } from '../config/Constants';
import * as apiModels from '../helpers/Api/models';
import ApprovalsMock from './Approvals.mock';

export default class AddOpportunityMock {
  static getAddOpportunityDefaultParams(): apiModels.AddOpportunityDefaultParams {
    return {
      opportunityId: faker.random.uuid(),
      area: faker.address.streetPrefix(),
      handler: faker.internet.userName(),
      reason: faker.random.word(),
      endDate: faker.date.future().toISOString(),
      probability: faker.random.number(99),
      oppRecordType: faker.random.word(),
      estimatedValue: faker.random.number(99999),
      stage: faker.random.word(),
      mustYN: faker.random.word(),
      salesman: faker.internet.userName(),
      currency: faker.finance.currencyCode(),
      tempId: faker.random.uuid(),
      startDate: faker.date.past().toISOString(),
      desc: faker.lorem.paragraph(1),
      customer: faker.internet.userName(),
      customerName: faker.company.companyName(),
      activ: faker.random.boolean(),
      userId: faker.internet.userName(),
      forecastCategory: faker.random.word(),
    };
  }

  static getUpdateOpportunityResponse(withError?: boolean, withMessage?: boolean): apiModels.UpdateOpportunityResponse {
    const error = ApprovalsMock.getError();
    const messages = ApprovalsMock.getErrorMessages(1);
    let response: apiModels.UpdateOpportunityResponse = {
      data: {
        approvalStatus: faker.random.arrayElement(['pending', 'approved']),
        approver: faker.internet.userName(),
        minimumStage: faker.random.word(),
      },
    };

    if (withError) {
      response = { ...response, error };
    }

    if (withMessage) {
      response = { ...response, messages };
    }

    if (withError && withMessage) {
      response = { ...response, error, messages };
    }

    return response;
  }

  static getAddOpportunityResponse(opportunityId: string, withError?: boolean, withMessage?: boolean): apiModels.AddOpportunityResponse {
    const error = ApprovalsMock.getError();
    const messages = ApprovalsMock.getErrorMessages(1);
    let response: apiModels.AddOpportunityResponse = {
      data: {
        opportunityId,
      },
    };

    if (withError) {
      response = { ...response, error };
    }

    if (withMessage) {
      response = { ...response, messages };
    }

    if (withError && withMessage) {
      response = { ...response, error, messages };
    }

    return response;
  }

  static getAddAttributesThunkActionParams(): apiModels.AddOpportunityAttributesParams {
    return {
      opportunityId: faker.random.uuid(),
      attributeType: faker.random.word(),
      attributeValue: faker.random.arrayElement([faker.random.word(), faker.random.number({ max: 99999 })]),
    };
  }

  static getSaveUserDefinedFieldParam(
    opportunityId: string,
    attributeType: string,
    attributeValue: string | number
  ): apiModels.SaveUserDefinedFieldParam {
    return {
      attributeType,
      parentFile: 'SROMOPH',
      parentId: opportunityId,
      attributeValue,
    };
  }

  static getAddItemsActionParams(): apiModels.AddOpportunityAddItemsActionParams {
    return {
      opportunityId: faker.random.uuid(),
      item: faker.commerce.productName(),
      quantity: faker.random.number({ max: 999 }),
      unit: faker.random.word(),
    };
  }

  static getAddItemToOpportunityParams(params: apiModels.AddOpportunityAddItemsActionParams): apiModels.AddItemToOpportunityParams {
    return {
      parentFile: 'SROMOPH',
      parentId: params.opportunityId,
      item: params.item,
      quantity: params.quantity,
      unit: params.unit,
    };
  }

  static getAddItemToOpportunityResponse(): apiModels.AddItemToOpportunityResponse {
    return {
      itemId: faker.random.uuid(),
    };
  }

  static getAddCustomerContactRequestParams(): apiModels.AddCustomerContactRequestParams {
    const emailAddress = faker.internet.email();
    return {
      contactParentFile: 'SROMOPH',
      contactParentId: faker.random.uuid(),
      contactPerson: `${faker.name.firstName()} ${faker.name.lastName()}`,
      contactDC: `${faker.name.firstName()} ${faker.name.lastName()}`,
      whatsApp: faker.phone.phoneNumber(),
      phone: faker.random.number({ min: 6666666666, max: 9999999999 }),
      mobile: faker.phone.phoneNumber(),
      linkedin: emailAddress,
      fax: faker.phone.phoneNumber(),
      email: emailAddress,
    };
  }

  static getDeleteCustomerContactParams(): apiModels.DeleteCustomerContactParams {
    return {
      contactParentFile: 'SROMOPH',
      contactParentId: faker.random.uuid(),
      contactId: faker.random.uuid(),
    };
  }

  static getDeleteOpportunityItemParams(): apiModels.DeleteOpportunityItemParams {
    return {
      itemId: faker.random.uuid(),
      parentId: faker.random.uuid(),
      parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE,
    };
  }
}

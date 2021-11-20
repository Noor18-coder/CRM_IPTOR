import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';
import ApprovalsMock from './Approvals.mock';

export default class CustomerDetailsMock {
  static getCustomerDetailsContactsGroupItem(num: number): apiModels.CustomerDetailsContactsGroupItem[] {
    return Array(num).fill({
      contactId: faker.random.word(),
      contactDC: faker.random.word(),
      contactPerson: faker.random.word(),
      email: faker.random.word(),
      phone: faker.random.number(9999999999),
      fax: faker.random.word(),
      businessPartner: faker.random.number(99999),
      role: faker.random.word(),
      ADDRESS: faker.random.word(),
      ADDRESS_2: faker.random.word(),
      DO_NOT_CONTACT: faker.random.boolean(),
      NO_LONGER_AT_COMP: faker.random.boolean(),
      OPTED_OUT_OF_EMAIL: faker.random.boolean(),
      PRIMARY_CONTACT: faker.random.boolean(),
      mobile: faker.random.word(),
      linkedin: faker.random.word(),
      ACTIVE: faker.random.boolean(),
    });
  }

  static getCustomerDetailsContactsGroupItemResponse(num?: number): apiModels.CustomerDetailsContactsGroupItemResponse {
    return {
      data: {
        items: this.getCustomerDetailsContactsGroupItem(num ?? 1),
      },
    };
  }

  static getCustomerDetailsDefaultFields(): apiModels.CustomerDetailsDefaultFields {
    return {
      businessPartner: faker.random.number(99999),
      internalName: faker.random.word(),
      type: faker.random.number(99999),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      addressLine1: faker.address.streetName(),
      country: faker.address.countryCode(),
      area: faker.address.streetPrefix(),
      active: faker.random.boolean(),
      phone: faker.phone.phoneNumber(),
      industry: faker.commerce.department(),
      owner: faker.company.companyName(),
    };
  }

  static getCustomerDetailsDefaultFieldsArray(num: number): apiModels.CustomerDetailsDefaultFields[] {
    return Array(num).fill(CustomerDetailsMock.getCustomerDetailsDefaultFields());
  }

  static getCustomerDetailsContactsGroupItemConstVal(): apiModels.CustomerDetailsContactsGroupItem[] {
    return [
      {
        contactId: 'bluetooth',
        contactDC: 'Cote',
        contactPerson: 'New',
        email: 'Plastic',
        phone: 5130757854,
        fax: 'Music',
        businessPartner: 71274,
        role: 'program',
        ADDRESS: 'Profound',
        ADDRESS_2: 'invoice',
        DO_NOT_CONTACT: true,
        NO_LONGER_AT_COMP: true,
        OPTED_OUT_OF_EMAIL: true,
        PRIMARY_CONTACT: true,
        mobile: 'ADP',
        linkedin: 'transmitting',
        ACTIVE: true,
        itemId: faker.random.word(),
        itemDescription: faker.random.word(),
        parentFile: faker.random.word(),
        parentId: faker.random.word(),
        rootId: faker.random.word(),
        lineNumber: faker.random.word(),
        item: faker.random.word(),
        ourPrice: 2,
        systemPrice: 2,
        existsInItemFile: true,
        price: true,
        unit: faker.random.word(),
        quantity: 2,
        hasNote: true,
        hasContact: true,
        hasAttribute: true,
        CONTACT_TYPE: faker.random.word(),
        CONTACT_UNTIL: faker.random.word(),
        DESCRIPTION: faker.random.word(),
      },
    ];
  }

  static getAddBusinessPartnerDefaultParams(): apiModels.AddBusinessPartnerDefaultParams {
    return {
      area: faker.address.streetPrefix(),
      country: faker.address.countryCode(),
      language: faker.locale.toString(),
      primaryCurrency: faker.finance.currencyCode(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      addressLine1: faker.address.streetAddress(),
      type: faker.random.number({ max: 9 }),
      phone: faker.phone.phoneNumber(),
      EMAIL: faker.internet.email(),
      active: faker.random.boolean(),
      businessPartner: faker.random.uuid(),
    };
  }

  static getAddBusinessPartnerResponse(
    businessPartner?: string,
    withError?: boolean,
    withErrorArrat?: boolean
  ): apiModels.AddBusinessPartnerResponse {
    const messages = ApprovalsMock.getErrorMessages(1);
    const error: string = faker.lorem.sentence();
    let response: apiModels.AddBusinessPartnerResponse = {
      data: {
        businessPartner: businessPartner ?? faker.random.uuid(),
      },
    };

    if (withError) {
      response = { ...response, error };
    }
    if (withErrorArrat) {
      response = { ...response, messages };
    }
    if (withError && withErrorArrat) {
      response = { ...response, messages, error };
    }
    return response;
  }

  static getAddAttributesThunkActionParams(type?: string): apiModels.AddAttributesThunkActionParams {
    return {
      businessPartnerId: faker.random.uuid(),
      attributeType: faker.random.word(),
      attributeValue: faker.random.arrayElement([faker.random.word(), faker.random.number({ max: 99999 })]),
      type,
    };
  }

  static getSaveUserDefinedFieldParam(
    businessPartnerId: string,
    attributeType: string,
    attributeValue: string | number,
    type?: string
  ): apiModels.SaveUserDefinedFieldParam {
    const params: apiModels.SaveUserDefinedFieldParam = {
      attributeType,
      parentFile: 'SRONAM',
      parentId: businessPartnerId,
      attributeValue,
    };
    if (type === 'date') {
      delete params.attributeValue;
      params.attributeValueD = attributeValue;
    }
    return params;
  }

  static getCustomerDetailsParams(): apiModels.CustomerDetailsParams {
    return {
      businessPartner: faker.company.companyName(),
    };
  }

  static getCustomerDetailsDefault(num: number): apiModels.CustomerDetailsDefault[] {
    return Array(num).fill({
      businessPartner: faker.random.number({ max: 9999999999 }),
      internalName: faker.company.bs(),
      type: faker.random.number({ max: 99999 }),
      name: faker.company.companyName(),
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.streetAddress(),
      addressLine3: faker.address.secondaryAddress(),
      addressLine4: faker.address.secondaryAddress(),
      postalCode: faker.address.zipCode(),
      country: faker.address.country(),
      area: faker.address.county(),
      language: faker.locale.toLowerCase(),
      invoiceCustomer: faker.random.number({ max: 9999999999 }),
      debtorAddressNumber: faker.random.number({ max: 9999999999 }),
      debtor: faker.random.number({ max: 9999999999 }),
      invoiceAddressNumber: faker.random.number({ max: 9999999999 }),
      currency: faker.finance.currencyCode(),
      isParent: faker.random.boolean(),
      active: faker.random.boolean(),
      numberOfActiveOpportunities: faker.random.number({ max: 9999999999 }),
      numberOfInactiveOpportunities: faker.random.number({ max: 9999999999 }),
      phone: faker.phone.phoneNumber(),
      subsidiaryEntities: [],
      productFamily: [],
      CURRENT_SYSTEM: faker.random.word(),
      CUST_CLASSIFICATION: faker.random.word(),
      CUSTOMER_AT_RISK: faker.random.boolean(),
      DC1_VERSION: [],
      DO_NOT_CONTACT: faker.random.boolean(),
      GLOBAL_PARENT: faker.random.number({ max: 9999999999 }),
      IBS_ASW_RELEASE: faker.random.number({ max: 9999999999 }),
      industry: faker.company.bsAdjective(),
      owner: faker.internet.userName(),
      PERP_USE_MAINT_CONV: faker.random.boolean(),
      REFERENCEABLE: faker.random.boolean(),
      TYPE: faker.random.arrayElement(),
    });
  }

  static getCustomerDetailsDefaultResponse(num?: number): apiModels.CustomerDetailsDefaultResponse {
    return {
      data: this.getCustomerDetailsDefault(num ?? 1),
    };
  }

  static getCrmUserDetailsParams(): apiModels.CrmUserDetailsParams {
    return {
      user: faker.internet.userName(),
    };
  }

  static getCrmUserDetails(): apiModels.CrmUserDetails {
    return {
      user: faker.internet.userName(),
      description: faker.lorem.paragraph(1),
      status: faker.random.boolean(),
      groupProfile: faker.random.boolean(),
      interactiveProcessingOk: faker.random.boolean(),
      defaultEnquiryStdSystemUnit: faker.random.word(),
      defaultEnquiryStdSystemUnitP: faker.random.word(),
      disPeriodChangeAllowed: faker.random.boolean(),
      handler: faker.internet.userName(),
      defaultOrderTypeReq: faker.random.word(),
      EMAIL: [],
      MANAGER: faker.internet.userName(),
      PHONE: [],
      ROLE: faker.random.word(),
    };
  }

  static getCrmUserDetailsResponse(): apiModels.CrmUserDetailsResponse {
    return {
      data: this.getCrmUserDetails(),
    };
  }

  static getCustomerDeleteParams(): apiModels.CustomerDeleteParams {
    return {
      businessPartner: faker.company.companyName(),
      contactDC: faker.internet.userName(),
    };
  }

  static getCustomerDeleteResponse(): apiModels.CustomerDeleteResponse {
    return {
      data: this.getCustomerDeleteParams(),
    };
  }

  static getCrmCountryParams(): apiModels.CrmCountryParams {
    return {
      country: faker.address.countryCode(),
    };
  }

  static getCrmCountry(num: number): apiModels.CrmCountry[] {
    return Array(num).fill({
      country: faker.address.country(),
      description: faker.lorem.paragraph(1),
      ISOcountry: faker.address.countryCode(),
      validateState: faker.random.number({ max: 99999 }),
      validateCounty: faker.random.number({ max: 99999 }),
    });
  }

  static getCrmCountryResponse(num?: number): apiModels.CrmCountryResponse {
    return {
      data: {
        items: this.getCrmCountry(num ?? 1),
      },
    };
  }

  static getAreaParams(): apiModels.AreaParams {
    return {
      area: faker.address.county(),
    };
  }

  static getArea(num: number): apiModels.Area[] {
    return Array(num).fill({
      area: faker.address.county(),
      description: faker.lorem.paragraph(1),
    });
  }

  static getAreaResponse(num?: number): apiModels.AreaResponse {
    return {
      data: {
        items: this.getArea(num ?? 1),
      },
    };
  }
}

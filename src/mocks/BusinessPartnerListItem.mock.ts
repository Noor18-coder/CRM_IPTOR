import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class BusinessPartnerListItemMock {
  static getBusinessPartnerListItem(num: number): apiModels.BusinessPartnerListItem[] {
    return Array(num).fill({
      businessPartner: faker.company.bs(),
      description: faker.company.catchPhraseDescriptor(),
      type: faker.random.number(5),
      internalName: faker.company.bsAdjective(),
      area: faker.address.streetPrefix(),
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.streetAddress(),
      addressLine3: faker.address.streetAddress(),
      addressLine4: faker.address.streetAddress(),
      country: faker.address.country(),
      creationDate: faker.date.future(),
      postalCode: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
      numberOfActiveOpportunities: faker.random.number(2),
      active: faker.random.boolean(),
      attributeExist: faker.random.boolean(),
      BASICTEST2: faker.random.number(2),
      BASICTEST3: faker.random.boolean(),
      BOOL_FIELD_TEST: faker.random.boolean(),
      CAMPAIGN: faker.lorem.word(),
      CMS_ACCOUNT_OWNER: faker.lorem.word(),
      CMS_SERVICES: faker.lorem.word(),
      CURRENT_SYSTEM: faker.lorem.word(),
      CUSTOMER_AT_RISK: faker.random.boolean(),
      CUSTOMER_UNTIL: faker.lorem.word(),
      DC1_VERSION: faker.lorem.word(),
      DO_NOT_CONTACT: faker.random.boolean(),
      industry: faker.lorem.word(),
      IP1_VERSION: faker.lorem.word(),
      NUMERIC_TEST_FIELD: faker.random.number(2),
      owner: faker.lorem.word(),
      productFamily: faker.lorem.word(),
      PARENT_ID: faker.lorem.word(),
      PERP_USE_MAINT_CONV: faker.random.boolean(),
      REFERENCEABLE: faker.random.boolean(),
      TYPE: faker.lorem.word(),
      addresses: this.getAddressesList(1),
      contacts: this.getCustomerContactsList(1),
    });
  }

  static getBusinessPartnerListResponse(num?: number): apiModels.BusinessPartnerListResponse {
    return {
      control: {
        total: num ?? 1,
      },
      data: {
        items: this.getBusinessPartnerListItem(num ?? 1),
      },
    };
  }

  static getAddressesList(num: number): apiModels.AddressesList[] {
    return Array(num).fill({
      businessPartner: faker.company.bs(),
      address: faker.address.streetAddress(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.streetAddress(),
      addressLine4: faker.address.streetAddress(),
      postalCode: faker.address.zipCode(),
      country: faker.address.country(),
      isDispatchAddress: faker.random.boolean(),
      isConfirmationAddress: faker.random.boolean(),
      isInvoiceAddress: faker.random.boolean(),
      isDebtorAddress: faker.random.boolean(),
      isPurchaseOrderAddress: faker.random.boolean(),
      isPayeeAddress: faker.random.boolean(),
      isSupplierDispatchAddress: faker.random.boolean(),
      isMsdsAddress: faker.random.boolean(),
      isDirectDeliveryPreferred: faker.random.boolean(),
      isDEAAddress: faker.random.boolean(),
      isValidAsShipToAddress: faker.random.boolean(),
    });
  }

  static getCustomerContactsList(num: number): apiModels.CustomerContactsList[] {
    return Array(num).fill({
      businessPartner: faker.company.bs(),
      contactDC: faker.company.companyName(),
      contactPerson: `${faker.name.firstName()} ${faker.name.lastName()}`,
      isPublicContact: faker.random.boolean(),
      userID: faker.internet.userName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      fax: faker.phone.phoneNumber(),
      DO_NOT_CONTACT: faker.random.boolean(),
      NO_LONGER_AT_COMP: faker.random.boolean(),
      OPTED_OUT_OF_EMAIL: faker.random.boolean(),
      PRIMARY_CONTACT: faker.random.boolean(),
      TITLE: faker.name.title(),
    });
  }

  static getBusinessPartnerAreaInfoOrIndustriesFilterItem(
    num: number
  ): apiModels.BusinessPartnerAreaInfoFilterItem[] | apiModels.BusinessPartnerIndustriesFilterItem[] {
    return Array(num).fill({
      value: faker.random.word().toUpperCase(),
      selectParam: faker.random.word().toLowerCase(),
      valueField: faker.random.word().toLowerCase(),
      fieldDescription: faker.random.words(5),
      area: faker.address.streetName(),
      description: faker.random.words(5),
    });
  }

  static getSelectOptionMethod(): apiModels.SelectOptionMethod {
    return {
      value: faker.random.word().toUpperCase(),
      selectParam: faker.random.word().toLowerCase(),
      valueField: faker.random.word().toLowerCase(),
      fieldDescription: faker.random.words(5),
      area: faker.address.streetName(),
      description: faker.random.words(5),
    };
  }

  static getBusinessPartnerListItemConstVal(): apiModels.BusinessPartnerListItem[] {
    return [
      {
        businessPartner: 'e-enable e-business bandwidth',
        description: '3rd generation',
        type: 1,
        internalName: 'efficient',
        area: 'a',
        addressLine1: '99324 Casper Junction',
        addressLine2: '1916 Reese Wall',
        addressLine3: '96405 Keanu Islands',
        addressLine4: '95244 Rossie Locks',
        country: 'Jordan',
        creationDate: new Date('2022-01-02T20:06:54.782Z'),
        postalCode: '82061',
        phone: 19937254989,
        numberOfActiveOpportunities: 0,
        active: true,
        attributeExist: false,
        BASICTEST2: 0,
        BASICTEST3: false,
        BOOL_FIELD_TEST: false,
        CAMPAIGN: 'non',
        CMS_ACCOUNT_OWNER: 'exercitationem',
        CMS_SERVICES: 'possimus',
        CURRENT_SYSTEM: 'et',
        CUSTOMER_AT_RISK: false,
        CUSTOMER_UNTIL: 'numquam',
        DC1_VERSION: 'nulla',
        DO_NOT_CONTACT: true,
        industry: 'qui',
        IP1_VERSION: 'corrupti',
        NUMERIC_TEST_FIELD: 2,
        owner: 'tempore',
        productFamily: 'fuga',
        PARENT_ID: 'accusamus',
        PERP_USE_MAINT_CONV: true,
        REFERENCEABLE: false,
        TYPE: 'sed',
        addresses: [
          {
            businessPartner: 'iterate one-to-one applications',
            address: 93630,
            name: 'Kayleigh Cummerata',
            addressLine1: '02020 Sofia Ridge',
            addressLine2: '35412 Jones Road',
            addressLine4: '912 Weimann Plains',
            postalCode: 55002,
            country: 'Western Sahara',
            isDispatchAddress: false,
            isConfirmationAddress: true,
            isInvoiceAddress: false,
            isDebtorAddress: true,
            isPurchaseOrderAddress: false,
            isPayeeAddress: false,
            isSupplierDispatchAddress: false,
            isMsdsAddress: false,
            isDirectDeliveryPreferred: false,
            isDEAAddress: false,
            isValidAsShipToAddress: false,
          },
        ],
        contacts: [
          {
            businessPartner: 'whiteboard revolutionary eyeballs',
            contactDC: 'Jaskolski - Emmerich',
            contactPerson: 'Sierra Hyatt',
            isPublicContact: true,
            userID: 'Jakob.Howell0',
            phone: '1-215-240-3051 x590',
            email: 'Cordia99@hotmail.com',
            fax: '859.807.5057 x043',
            DO_NOT_CONTACT: false,
            NO_LONGER_AT_COMP: false,
            OPTED_OUT_OF_EMAIL: true,
            PRIMARY_CONTACT: false,
            TITLE: 'National Configuration Administrator',
          },
        ],
      },
    ];
  }

  static getBusinessPartnerListParams(): apiModels.BusinessPartnerListParams {
    const strAr = Array(4).fill(faker.random.word());
    const str = faker.random.word();
    return {
      businessPartnerTextSearch: faker.random.word(),
      searchField: faker.database.column(),
      includeInactive: faker.random.boolean(),
      crmAttributesTextSearch: faker.random.word(),
      industry: faker.random.arrayElement([str, strAr]),
      area: faker.random.arrayElement([str, strAr]),
      productFamily: faker.random.arrayElement([str, strAr]),
      includeAddresses: faker.random.boolean(),
      includeContacts: faker.random.boolean(),
      active: faker.random.boolean(),
    };
  }

  static getBusinessPartnerListApiMethodParams(): apiModels.BusinessPartnerListApiMethodParams {
    return {
      freeTextSearch: faker.random.word(),
      limit: 100,
      offset: 0,
      orderBy: faker.random.arrayElement(['asc', 'dsc']),
      otherparams: this.getBusinessPartnerListParams(),
    };
  }

  static getAreaListItem(num: number): apiModels.AreaListItem[] {
    return Array(num).fill({
      area: faker.address.county(),
      description: faker.lorem.paragraph(1),
    });
  }

  static getAreaListResponse(num?: number): apiModels.AreaListResponse {
    return {
      data: {
        items: this.getAreaListItem(num ?? 1),
      },
    };
  }
}

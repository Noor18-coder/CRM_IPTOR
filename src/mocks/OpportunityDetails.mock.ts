import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export interface DetailsData {
  opportunityId: string;
  desc: string;
  customer: string;
  customerType: number;
  customerName: string;
  handler: string;
  salesman: string;
  area: string;
  stage: string;
  probability: number;
  reason: string;
  estimatedValue: number;
  currentValue: number;
  currency: string;
  activ: boolean;
  endDate: string;
  authority: boolean;
  oppRecordType: string;
  logExist: boolean;
  noteExist: boolean;
  contactExist: boolean;
  taskExist: boolean;
  itemExist: boolean;
  attributeExist: boolean;
  totalOpportunityValue: number;
  totalOpportunityCost: number;
  totalPsValue: number;
  totIncrementalOppValue: number;
  totalOpportunityNetValue: number;
}

interface Info {
  Infotype: string;
  owner: string;
  type: string;
  number: string;
  Region: string;
  RLFYear: number;
  MYear: number;
  PsValue: number;
}

export class OpportunityDetailsMock {
  static getOpportunityDetailsGroupItem(num: number): apiModels.OpportunityDetailsGroupItem[] {
    return Array(num).fill({
      parentFile: faker.random.word(),
      parentId: faker.random.uuid(),
      attributeType: faker.commerce.department(),
      rootId: faker.random.uuid(),
      group: faker.random.word(),
      valueId: faker.random.uuid(),
      attributeValue: faker.random.word(),
      description: faker.random.words(5),
    });
  }

  static getOpportunityDetailsDefaultResponse(num?: number): apiModels.OpportunityDetailsDefaultResponse {
    return {
      data: {
        items: this.getOpportunityDetailsGroupItem(num ?? 1),
      },
    };
  }

  static getOpportunityByID(): DetailsData {
    return {
      opportunityId: faker.random.uuid(),
      desc: 'postman test',
      customer: '10000001',
      customerType: 1,
      customerName: 'salesforce.com',
      handler: 'PLMARKAN',
      salesman: '',
      area: 'North America',
      stage: 'A0',
      probability: 0,
      reason: '',
      estimatedValue: 0,
      currentValue: 0,
      currency: 'SEK',
      activ: true,
      endDate: '2021-05-04',
      authority: true,
      oppRecordType: '*NONE',
      logExist: true,
      noteExist: false,
      contactExist: false,
      taskExist: true,
      itemExist: false,
      attributeExist: false,
      totalOpportunityValue: 0,
      totalOpportunityCost: 0,
      totalPsValue: 0,
      totIncrementalOppValue: 0,
      totalOpportunityNetValue: 0,
    };
  }

  static getOpportunityDetailsDefault(): apiModels.OpportunityDetailsDefault {
    return {
      opportunityId: faker.random.uuid(),
      desc: faker.lorem.paragraph(1),
      customer: faker.company.companyName(),
      customerType: faker.random.number({ max: 9999 }),
      customerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      handler: faker.internet.userName(),
      salesman: `${faker.name.firstName()} ${faker.name.lastName()}`,
      area: faker.address.streetPrefix(),
      stage: faker.random.word(),
      probability: faker.random.number({ max: 9999 }),
      reason: faker.random.word(),
      estimatedValue: faker.random.number({ max: 9999 }),
      currentValue: faker.random.number({ max: 9999 }),
      currency: faker.finance.currencyCode(),
      activ: faker.random.boolean(),
      endDate: faker.date.future().toISOString(),
      authority: faker.random.boolean(),
      oppRecordType: faker.random.word(),
      logExist: faker.random.boolean(),
      noteExist: faker.random.boolean(),
      contactExist: faker.random.boolean(),
      taskExist: faker.random.boolean(),
      itemExist: faker.random.boolean(),
      attributeExist: faker.random.boolean(),
      totalOpportunityValue: faker.random.number({ max: 9999 }),
      totalOpportunityCost: faker.random.number({ max: 9999 }),
      totalPsValue: faker.random.number({ max: 9999 }),
      totIncrementalOppValue: faker.random.number({ max: 9999 }),
      totalOpportunityNetValue: faker.random.number({ max: 9999 }),
      defaultApprover: `${faker.name.firstName()} ${faker.name.lastName()}`,
      approvalRequired: faker.random.boolean(),
      approver: `${faker.name.firstName()} ${faker.name.lastName()}`,
      exchangeRate: faker.random.number({ max: 9999 }),
      estimatedValueSys: faker.random.number({ max: 9999 }),
      minimumStage: faker.random.arrayElement(['A1', 'A2', 'A3', 'A4']),
      level: faker.random.number({ max: 9999 }),
      approvalStatus: faker.random.word(),
      error: faker.random.word(),
      userId: faker.internet.userName(),
    };
  }

  static getOpportunityEditOptions(): apiModels.OpportunityEditOptions {
    return {
      allowEdit: faker.random.boolean(),
      open: faker.random.boolean(),
      success: faker.random.boolean(),
      error: faker.random.words(5),
      groupName: faker.random.word(),
      action: faker.random.word(),
      approvalHistory: faker.random.word(),
      subGroupName: faker.random.word(),
      approvalSubmitMessage: faker.random.word(),
      closeLostForm: faker.random.boolean(),
    };
  }

  static getOpportunityContact(num: number): apiModels.OpportunityContact[] {
    return Array(num).fill({
      contactId: faker.random.uuid(),
      contactParentFile: faker.random.word(),
      contactParentId: faker.random.uuid(),
      rootId: faker.random.uuid(),
      contactPerson: `${faker.name.firstName()} ${faker.name.lastName()}`,
      contactDC: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      noteExist: faker.random.boolean(),
      existDC: faker.random.boolean(),
      isEditable: faker.random.boolean(),
      attributeExist: faker.random.boolean(),
      domainTrans: faker.random.word(),
      visitingAddress: faker.address.streetAddress(),
      role: faker.random.word(),
    });
  }

  static getOpportunityContactsResponse(num?: number): apiModels.OpportunityContactsResponse {
    return {
      data: {
        items: this.getOpportunityContact(num ?? 1),
      },
    };
  }
}

export const getInfo = (): Info[] => {
  return [
    {
      Infotype: 'Basic Info',
      owner: 'Mathew King',
      type: 'License',
      number: '10000006',
      Region: 'North America',
      RLFYear: 2003,
      MYear: 2014,
      PsValue: 0,
    },

    {
      Infotype: 'Item Info',
      owner: 'Mathew King',
      type: 'License',
      number: '10000008',
      Region: 'North America',
      RLFYear: 2003,
      MYear: 2014,
      PsValue: 0,
    },
    {
      Infotype: 'More Info',
      owner: 'Mathew King',
      type: 'License',
      number: '10000009',
      Region: 'North America',
      RLFYear: 2003,
      MYear: 2014,
      PsValue: 0,
    },
    {
      Infotype: 'Contact Info',
      owner: 'Mathew King',
      type: 'License',
      number: '10000005',
      Region: 'North America',
      RLFYear: 2003,
      MYear: 2014,
      PsValue: 0,
    },
  ];
};

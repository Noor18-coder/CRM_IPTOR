import * as faker from 'faker/locale/en_US';

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
  static getOpportunityByID(): DetailsData {
    const data = {
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
    return data;
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

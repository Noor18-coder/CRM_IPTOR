import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';
import { SelectOptionMethod } from '../components/Opportunity/Opportunities';
import { SortModel } from '../components/Shared/Grid/Grid';

export interface Data {
  name: string;
  number: string;
  type: string;
  customer: string;
  owner: string;
  stage: string;
  forecast: string;
  close_quarter: string;
  size: string;
}

interface Fields {
  field: string;
  sortable: boolean;
  headerName: string;
  width: { width: string; background?: string };
  maxWidth: number;
  cellRender: (params: any) => string;
}

export class OpportunityMock {
  static getOpportunities(num: number): Data[] {
    return Array(num).fill({
      name: 'Dell Laptops',
      number: faker.random.uuid(),
      type: '',
      customer: 'Astra Zenecca, North America',
      owner: 'Mathew King',
      stage: 'A4',
      forecast: 'UPSIDE',
      close_quarter: 'Q2',
      size: '$37K',
    });
  }

  static getOpportunityListItem(num: number): apiModels.OpportunityListItem[] {
    return Array(num).fill({
      name: faker.random.word(),
      opportunityId: faker.random.uuid(),
      desc: faker.random.word(),
      customer: faker.random.word(),
      handler: faker.random.word(),
      salesman: faker.random.word(),
      area: faker.random.word(),
      stage: faker.random.word(),
      probability: faker.random.number({ max: 99999 }),
      reason: faker.random.word(),
      estValue: faker.random.number({ max: 99999 }),
      curValue: faker.random.number({ max: 99999 }),
      currency: faker.random.word(),
      activ: faker.random.boolean(),
      endDate: faker.date.future(),
      rootId: faker.random.word(),
      authority: faker.random.boolean(),
      oppRecordType: faker.random.word(),
      logExist: faker.random.boolean(),
      noteExist: faker.random.boolean(),
      contactExist: faker.random.boolean(),
      taskExist: faker.random.boolean(),
      itemExist: faker.random.boolean(),
      attributeExist: faker.random.boolean(),
      forecastCategory: faker.random.word(),
      approver: faker.random.word(),
      estValueSys: faker.random.number({ max: 99999 }),
      exchangeRate: faker.random.number({ max: 99999 }),
      approvalStatus: faker.random.word(),
      userId: faker.random.word(),
    });
  }

  static getOpportunityFilterItem(num: number): apiModels.OpportunityFilterItem[] {
    return Array(num).fill({
      value: faker.random.word(),
      selectParam: faker.random.word(),
    });
  }

  static getSelectOptionMethod(): SelectOptionMethod {
    return {
      value: faker.random.word(),
      selectParam: faker.random.word(),
      handler: faker.random.word(),
    };
  }

  static getSortModel(num: number): SortModel[] {
    return Array(num).fill({
      colId: faker.database.column(),
      sort: faker.random.arrayElement(['asc', 'dsc']),
    });
  }

  static getOpportunityListParams(): apiModels.OpportunityListParams {
    return {
      selectUserId: faker.random.uuid(),
      selectHandler: faker.internet.userName(),
      selectCloseDateFrom: faker.date.past().toISOString(),
      selectCloseDateTo: faker.date.recent().toISOString(),
      selectStageFrom: faker.date.past().toISOString(),
      selectStageTo: faker.date.recent().toISOString(),
      searchField: faker.database.column(),
      selectOppRecordType: faker.random.word(),
      selectCustomer: faker.company.companyName(),
      selectApprover: faker.internet.userName(),
      selectApprovalStatus: faker.random.word(),
      activeOp: faker.random.boolean(),
    };
  }

  static getOpportunityListApiMethodParams(): apiModels.OpportunityListApiMethodParams {
    return {
      limit: 100,
      offset: 0,
      orderBy: faker.random.arrayElement(['asc', 'desc']),
      otherparams: this.getOpportunityListParams(),
    };
  }

  static getOpportunityListResponse(num?: number): apiModels.OpportunityListResponse {
    return {
      data: {
        control: {
          more: faker.random.boolean(),
        },
        data: {
          items: this.getOpportunityListItem(num ?? 1),
        },
      },
    };
  }
}

export const getFields = (): Fields[] => {
  return [
    {
      field: 'oppRecordType',
      sortable: true,
      headerName: 'Type',
      width: { width: '10%' },
      maxWidth: 100,
      cellRender: (params: any) => {
        return params.value;
      },
    },

    {
      field: 'name',
      sortable: true,
      headerName: 'Name and Number',
      width: { width: '10%' },
      maxWidth: 100,
      cellRender: (params: any) => {
        return `<span class="o-name">${params.value}</span><span class="o-number">${params.data.opportunityId}</span>`;
      },
    },
    {
      field: 'customer',
      sortable: true,
      headerName: 'Customer',
      width: { width: '20%', background: 'blue' },
      maxWidth: 200,
      cellRender: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'handler',
      sortable: true,
      headerName: 'Owner',
      width: { width: '15%' },
      maxWidth: 120,
      cellRender: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'stage',
      sortable: true,
      headerName: 'Stage',
      width: { width: '10%' },
      maxWidth: 120,
      cellRender: (params: any) => {
        return `<span class="o-stage">${params.value}</span>`;
      },
    },
    {
      field: 'forecast',
      sortable: true,
      headerName: 'Forecast',
      width: { width: '10%' },
      maxWidth: 190,
      cellRender: (params: any) => {
        return `<span class="o-forecast">${params.value}</span>`;
      },
    },
    {
      field: 'endDate',
      sortable: true,
      headerName: 'Close Quarter',
      width: { width: '10%' },
      maxWidth: 120,
      cellRender: (params: any) => {
        return `<span class="o-quarter">${params.value}</span>`;
      },
    },
    {
      field: 'curValue',
      sortable: true,
      headerName: 'Deal Size',
      width: { width: '10%' },
      maxWidth: 80,
      cellRender: (params: any) => {
        return `<span class="o-size">${params.data.currency} ${params.value}</span>`;
      },
    },
  ];
};

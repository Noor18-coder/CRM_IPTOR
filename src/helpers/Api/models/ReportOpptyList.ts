export interface ProductList {
  opportunityId: string;
  itemId: string;
  itemDescription: string;
  lineNumber: number;
  item: string;
  ourPrice: number;
  systemPrice: number;
  quantity: number;
  unit: string;
  isFreeOfCharge: boolean;
  ATRTST1ITM: string | string[];
  ATRTST2ITM: string | string[];
  DATE_MULTIPLE: string | string[];
}

export interface ContactsList {
  opportunityId: string;
  contactId: string;
  contactPerson: string;
  contactDC: string;
  email: string;
  phone: string;
  mobile: string;
  fax: string;
}

export interface ReportOpptyList {
  handler: string;
  reason: string;
  endDate?: Date;
  rootId: string;
  estValueSys: number;
  logExist: boolean;
  contactExist: boolean;
  oppRecordType: string;
  attributeExist: boolean;
  opportunityId: string;
  estValue: number;
  exchangeRate: number;
  itemExist: boolean;
  noteExist: boolean;
  area: string;
  approvalStatus: string;
  probability: number;
  taskExist: boolean;
  stage: string;
  forecastCategory: string;
  name: string;
  mustYN?: boolean;
  salesman: string;
  activ: boolean;
  startDate?: string;
  desc: string;
  customer: string;
  currency: string;
  ACTION_PENDING: string;
  ATRTST1: string | string[];
  ATRTST2: string | string[];
  CLOUD_OPP_SIZING: string | string[];
  CLOUD_Y1: number | number[];
  CLOUD_Y2: number | number[];
  CLOUD_Y3: number | number[];
  CLOUD_Y4: number | number[];
  CLOUD_Y5: number | number[];
  CLOUD_Y6: number | number[];
  CLOUD_Y7: number | number[];
  CMP_ONE_OFF_FEE: number | number[];
  CMS_PRESALE_CONS: number | number[];
  CONTACT_TERM_M: number | number[];
  ENTER_ILF_OPP_VALUE: number | number[];
  LEADSOURCE: string | string[];
  LICENSE_CATEGORY: string | string[];
  LICENSE_SUM: number | number[];
  MAINT_SUPP_FIRST_Y: number | number[];
  NEXTSTEP: string | string[];
  PARTNER: string | string[];
  PBU: string | string[];
  PRESALE_CONULTANT: string | string[];
  PS_REVENUE_GENERATED: number | number[];
  REGION: string | string[];
  REP_ANNUAL_REVE_CMS: number | number[];
  REP_ANNUAL_REVE_CS: number | number[];
  REP_ANNUAL_REVENUE: number | number[];
  RLF_VALUE: string | string[];
  SUBSCRIPTION_Y1: number | number[];
  SUBSCRIPTION_Y2: number | number[];
  SUBSCRIPTION_Y3: number | number[];
  SUBSCRIPTION_Y4: number | number[];
  SUBSCRIPTION_Y5: number | number[];
  SUBSCRIPTION_Y6: number | number[];
  SUBSCRIPTION_Y7: number | number[];
  TEST_NUMERIC_MANDATO: number | number[];
  THIRD_PARTY_COGS: number | number[];
  MULTIPLE_TEXT: string | string[];
  TEST_MULTY: string | string[];
  products?: ProductList[];
  contacts?: ContactsList[];
}

export interface ReportsOpptyParams {
  selectStageFrom?: string;
  selectOppRecordType?: string;
  searchField?: string;
  selectHandler?: string;
  selectCloseDate?: number;
  selectCloseDateTo?: string;
  crmAttributesTextSearch?: string;
  selectStage?: string;
  activeOp?: boolean;
  selectSalesmanTo?: string;
  selectStartDateTo?: string;
  selectCloseDateFrom?: string;
  selectAreaTo?: string;
  selectStartDateFrom?: string;
  opportunityId?: string;
  selectForecastCategory: string;
  selectStageTo?: string;
  selectCustomer?: string;
  selectAreaFrom?: string;
  selectSalesmanFrom?: string;
}

export interface ReportsOpptyResponse {
  control?: {
    total: number;
  };
  data?: {
    items: ReportOpptyList[];
  };
}

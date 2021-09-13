export interface ProductList {
  itemId: string;
  itemDescription: string;
  lineNumber: number;
  item: string;
  ourPrice: number;
  systemPrice: number;
  quantity: number;
  unit: string;
  isFreeOfCharge: boolean;
}

export interface ContactsList {
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
  endDate: Date;
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
  mustYN: boolean;
  salesman: string;
  activ: boolean;
  startDate: string;
  desc: string;
  customer: string;
  currency: string;
  ACTION_PENDING: string;
  CLOUD_OPP_SIZING: string;
  CLOUD_Y1: number;
  CLOUD_Y2: number;
  CLOUD_Y3: number;
  CLOUD_Y4: number;
  CLOUD_Y5: number;
  CLOUD_Y6: number;
  CLOUD_Y7: number;
  CMP_ONE_OFF_FEE: number;
  CMS_PRESALE_CONS: number;
  CONTACT_TERM_M: number;
  ENTER_ILF_OPP_VALUE: number;
  LEADSOURCE: string;
  LICENSE_CATEGORY: string;
  LICENSE_SUM: number;
  MAINT_SUPP_FIRST_Y: number;
  NEXTSTEP: string;
  PARTNER: string;
  PBU: string;
  PRESALE_CONULTANT: string;
  PS_REVENUE_GENERATED: number;
  REGION: string;
  REP_ANNUAL_REVE_CMS: number;
  REP_ANNUAL_REVE_CS: number;
  REP_ANNUAL_REVENUE: number;
  RLF_VALUE: string;
  SUBSCRIPTION_Y1: number;
  SUBSCRIPTION_Y2: number;
  SUBSCRIPTION_Y3: number;
  SUBSCRIPTION_Y4: number;
  SUBSCRIPTION_Y5: number;
  SUBSCRIPTION_Y6: number;
  SUBSCRIPTION_Y7: number;
  TEST_NUMERIC_MANDATO: number;
  THIRD_PARTY_COGS: number;
  products: ProductList[];
  contacts: ContactsList[];
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
  data: {
    items: ReportOpptyList[];
  };
}

export interface Item {
  item: string;
  description: string;
  internalDescription: string;
  accountGroup: string;
  creationDate: string;
  itemCategory1: string;
  itemCategory2: string;
  itemCategory3: string;
  itemCategory4: string;
  itemCategory5: string;
  itemCategory6: string;
  itemGroup: string;
  itemType: string;
  responsible: string;
  mainSupplier: string;
  userDefinedNum1: number;
  userDefinedNum2: number;
  userDefinedAlpha1: string;
  userDefinedAlpha2: string;
  stockingUnit: string;
  defaultSalesUnit: string;
  commodityCode: string;
  supplierQuotationGroup: string;
  itemDiscountGroup: string;
  itemPriceGroup: string;
  itemFamily: string;
  itemSector: string;
  planner: string;
  drawingNumber: string;
  handlingStatus: string;
  itemSegment1: string;
  itemSegment2: string;
  itemSegment3: string;
  itemSegment4: string;
  itemSegment5: string;
  itemSegment6: string;
  primarySegmant: string;
  msdsId: string;
  version?: string;
  cost?: string;
  revenue?: string;
}

export interface ItemResponse {
  control?: {
    total: number;
  };
  data: {
    items: Item[];
  };
}

export interface AddItemToOpportunityParams {
  parentFile: string;
  parentId: string;
  item: string;
  quantity: number;
  unit: string;
}

export interface AddItemToOpportunityResponse {
  itemId: string;
}

export interface ItemsApiMethodParams {
  freeTextSearch: string;
  offset?: number;
  limit?: number;
}

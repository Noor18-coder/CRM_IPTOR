export interface ApiRequestControls {
    freeTextSearch?: string;
    limit?: number;
    offset?: number;
    statistics?: boolean;
    fields?: string;
    orderBy?: string;
  }
  
  export interface ApiRequestParams {
    [key: string]: string | number | boolean;
  }
  
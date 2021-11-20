export interface ForeCastInfo {
  forecastCategory: string;
  description: string;
}

export interface ForeCastInfoResponseData {
  items: ForeCastInfo[];
}

export interface ForeCastInfoResponse {
  data: ForeCastInfoResponseData;
}

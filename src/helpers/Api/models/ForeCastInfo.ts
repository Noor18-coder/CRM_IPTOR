export interface ForeCastInfo {
  forecastCategory: string;
  description: string;
}

export interface ForeCastInfoResponse {
  items: ForeCastInfo[];
}

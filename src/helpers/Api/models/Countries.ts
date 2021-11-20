export interface CountryInfo {
  country: string;
  validateCountry: boolean;
  ISOCountry: string;
  description: string;
  countryIdIn: string;
}

export interface CountryInfoResponseData {
  items: CountryInfo[];
}

export interface CountryInfoResponse {
  data: CountryInfoResponseData;
}

export interface AreaInfo {
  area: string;
  description: string;
}

export interface AreaInfoResponseData {
  items: AreaInfo[];
}

export interface AreaInfoResponse {
  data: AreaInfoResponseData;
}

export interface CountryListParams {
  country?: string;
}

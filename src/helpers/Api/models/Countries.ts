export interface CountryInfo {
  country: string;
  validateCountry: boolean;
  ISOCountry: string;
  description: string;
  countryIdIn: string;
}

export interface CountryInfoResponse {
  items: CountryInfo[];
}

export interface AreaInfo {
  area: string;
  description: string;
}

export interface AreaInfoResponse {
  items: AreaInfo[];
}

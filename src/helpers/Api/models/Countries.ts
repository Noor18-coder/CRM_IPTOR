export interface CountryInfo {
    country: string,
    validateCountry: boolean,
    ISOCountry: string,
    description: string,
    countryIdIn: string
}

export interface CountryInfoResponse {
    items: CountryInfo[]
}
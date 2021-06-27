export interface BusinessPartnerListItem {
    businessPartner: string,
    description: string,
    type: number,
    internalName: string,
    area: string,
    addressLine1: string,
    alias: string,
    companyRegistrationNumber: number,
    country: string,
    creationDate: Date,
    businessPartnerCategory1: number,
    postalCode: string,
}

export interface BusinessPartnerListParams {
    businessPartnerTextSearch?: string;
    searchField?: string
}

export interface BusinessPartnerFilterItem {
    value: string;
    selectParam: string;
}

export interface BusinessPartnerListResponse {
    data: {
        control?: {
            total: number
        },
        data: {
            items: BusinessPartnerListItem[]
        }
    }
}
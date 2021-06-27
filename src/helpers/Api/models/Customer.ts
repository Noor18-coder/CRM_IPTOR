export interface BusinessPartnerListItem {
    businessPartner: string,
    description: string,
    type: number,
    internalName: string,
    area: string,
    addressLine1: string,
    country: string,
    creationDate: Date,
    postalCode: string,
    industry: string,
    owner: string,
    numberOfActiveOpportunities: number,
    active: boolean
}

export interface BusinessPartnerListParams {
    businessPartnerTextSearch?: string;
    searchField?: string;
    includeInactive?: boolean;
    crmAttributesTextSearch?: string;
    industry?: string;
    area?: string;
}

export interface BusinessPartnerFilterItem {
    value: string;
    selectParam: string;
}

export interface BusinessPartnerListResponse {
    
        control?: {
            total: number
        },
        data: {
            items: BusinessPartnerListItem[]
        }
    
}

export interface AreaListItem {
    area: string,
    description: string
}

export interface AreaListParams {
    area?: string;
    description?: string
}

export interface AreaListResponse {
    data: {
        items: AreaListItem[]
    }

}
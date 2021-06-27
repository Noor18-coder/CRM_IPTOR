export interface AddBusinessPartnerDefaultParams {
    area?: string;
    country?: string;
    language?: string;
    primaryCurrency?: string;
    name?: string;
    addressLine1?: string;
    type?: number;
    phone?: string;
    EMAIL?: string;
}

export interface AddBusinessPartnerResponse {
    data : {
        businessPartner:string
    }
}
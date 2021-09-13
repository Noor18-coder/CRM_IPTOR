import { ErrorMessage } from './Approvals';

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
  active?: boolean;
  businessPartner?: string;
}

export interface AddBusinessPartnerResponse {
  data: {
    businessPartner: string;
  };
  error?: string;
  messages?: ErrorMessage[];
}

export interface CurrencyItem {
    currency : string;
    description : string;
    currencyISO : string;
    decimalsForAmount: number;
    decimalsForAmountToDisplay: number;    
}

export interface CurrencyInfoResponse {
    
    data: {
      items: CurrencyItem[]
      }
    
  }
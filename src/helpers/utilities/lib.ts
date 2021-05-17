import getSymbolFromCurrency from 'currency-symbol-map';

export const getCurrencySymbol = (currency:string) =>  getSymbolFromCurrency(currency);


export const getQuarterOfYearFromDate = (strDate:string) => {
    const date = new Date(strDate);
    if(date instanceof Date && !isNaN(date.valueOf())){
      var month = date.getMonth() + 1;
      return 'Q' + (Math.ceil(month / 3));
    }
    return '-';
}
import getSymbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
export const getCurrencySymbol = (currency:string) =>  getSymbolFromCurrency(currency);


export const getQuarterOfYearFromDate = (strDate:string) => {
    const date = new Date(strDate);
    if(date instanceof Date && !isNaN(date.valueOf())){
      var month = date.getMonth() + 1;
      return 'Q' + (Math.ceil(month / 3));
    }
    return '-';
}

export const getIntialsFromFullName = (name:string) => {
  const initials = !!name && name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
  return  initials;
}


export const getStartDateOfQuarter = (quarter_name:number) => {
  const now = new Date();
  let firstDate = new Date(now.getFullYear(), (quarter_name-1) * 3 , 1);
  const formatDate = moment(firstDate).format('YYYY-MM-DD');
  return formatDate;
}


export const getEndDateOfQuarter = (quarter_name:number) => {
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), (quarter_name-1) * 3 , 1);
  const endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
  const formatDate = moment(endDate).format('YYYY-MM-DD');
  return formatDate;
}

export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const getCurrPrevNextYearQuarters = () => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const nextYear = currentYear + 1;
  const currentQuarters = [
    currentYear + " - Q1",
    currentYear + " - Q2",
    currentYear + " - Q3",
    currentYear + " - Q4",
  ];
  const previousQuarters = [
    previousYear + " - Q1",
    previousYear + " - Q2",
    previousYear + " - Q3",
    previousYear + " - Q4",
  ];
  const nextQuarters = [
    nextYear + " - Q1",
    nextYear + " - Q2",
    nextYear + " - Q3",
    nextYear + " - Q4",
  ];
  const currPrevQuarters = currentQuarters.concat(previousQuarters);
  const quarterArray = currPrevQuarters.concat(nextQuarters);
  return quarterArray;
}

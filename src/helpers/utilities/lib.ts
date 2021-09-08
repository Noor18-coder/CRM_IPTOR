import getSymbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';

export const getCurrencySymbol = (currency: string): string => `${getSymbolFromCurrency(currency)}`;

export const getQuarterOfYearFromDate = (strDate: string): string => {
  const date = new Date(strDate);
  if (date instanceof Date && !Number.isNaN(date.valueOf())) {
    const month = date.getMonth() + 1;
    return `Q${Math.ceil(month / 3)}`;
  }
  return '-';
};

export const getIntialsFromFullName = (name: string): any => {
  return !!name && name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);
};

export const getDateTimeFormat = (date: string): any => {
  return moment(date, 'YYYY.MM.DD HH:mm').format('D MMMM YYYY, H:mm');
};

export const getStartDateOfQuarter = (quarter_name: number): string => {
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), (quarter_name - 1) * 3, 1);
  return moment(firstDate).format('YYYY-MM-DD');
};

export const getEndDateOfQuarter = (quarter_name: number): string => {
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), (quarter_name - 1) * 3, 1);
  const endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
  return moment(endDate).format('YYYY-MM-DD');
};

export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

export const getCurrPrevNextYearQuarters = () => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const nextYear = currentYear + 1;
  const currentQuarters = [`${currentYear} - Q1`, `${currentYear} - Q2`, `${currentYear} - Q3`, `${currentYear} - Q4`];
  const previousQuarters = [`${previousYear} - Q1`, `${previousYear} - Q2`, `${previousYear} - Q3`, `${previousYear} - Q4`];
  const nextQuarters = [`${nextYear} - Q1`, `${nextYear} - Q2`, `${nextYear} - Q3`, `${nextYear} - Q4`];
  const currPrevQuarters = currentQuarters.concat(previousQuarters);
  return currPrevQuarters.concat(nextQuarters);
};

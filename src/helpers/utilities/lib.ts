import getSymbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getCurrencySymbol = (currency: string): string => `${getSymbolFromCurrency(currency)}`;

export const currentRunningYear = new Date().getFullYear();

export const yearStartDate = new Date(new Date().getFullYear(), 0, 1);

export const yearEndDate = new Date(new Date().getFullYear(), 11, 31);

export const monthStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export const monthEndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

export const weekStartDate = moment().startOf('week').toDate();

export const weekEndDate = moment().endOf('week').toDate();

export const getDashDateFormat = (date: any): string => {
  const mnth = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
};

export const getMonthsList = (from: any, to: any) => {
  const datFrom = new Date(`1 ${from}`);
  const datTo = new Date(`1 ${to}`);
  let arr = monthNames.slice(datFrom.getMonth(), datTo.getMonth() + 1);
  if (!arr.length) {
    arr = monthNames.slice(datFrom.getMonth(), 12);
    arr = arr.concat(monthNames.slice(0, datTo.getMonth() + 1));
  }
  return arr;
};

export const getMonthName = (date: string): any => {
  return moment(date, 'YYYY-MM-DD').format('MMMM');
};

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

export const getDate = (date: string): any => {
  return moment(date).toDate();
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

export const getStartDateOfQuarterAndYear = (quarter: string, year: string): any => {
  const y = parseInt(year, 10);
  const q = parseInt(quarter, 10);
  const firstDate = new Date(y, (q - 1) * 3, 1);
  return moment(firstDate).format('YYYY-MM-DD');
};

export const getEndDateOfQuarterAndYear = (quarter: string, year: string): any => {
  const y = parseInt(year, 10);
  const q = parseInt(quarter, 10);
  const firstDate = new Date(y, (q - 1) * 3, 1);
  const endDate = new Date(y, firstDate.getMonth() + 3, 0);
  return moment(endDate).format('YYYY-MM-DD');
};

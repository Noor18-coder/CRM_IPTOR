import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getLocaleDateFormat } from '../../../helpers/utilities/RegisterAndSetLocale';

interface Props {
  currentDate?: string;
  onDateSelect: (key: Date) => void;
}

const DateInput: React.FC<Props> = ({ currentDate, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = React.useState<any>();
  const [dateFormat, setDateFormat] = React.useState<any>();

  const onChange = (date: any) => {
    const formatDate = moment(date).toDate();
    setSelectedDate(date);
    onDateSelect(formatDate);
  };

  const FocusNextItem = () => {
    const nextElement = document.getElementById('BASICTEST2') as HTMLInputElement;
    const nextElement1 = document.getElementById('currency') as HTMLInputElement;
    const nextElement2 = document.getElementById('TEST_NUMERIC_OPTIONA_2') as HTMLInputElement;
    if (nextElement) {
      nextElement.focus();
    }
    if (nextElement1) {
      nextElement1.focus();
    }
    if (nextElement2) {
      nextElement2.focus();
    }
  };

  React.useEffect(() => {
    if (currentDate) {
      setSelectedDate(new Date(currentDate));
    } else {
      setSelectedDate(new Date());
    }
    const format = getLocaleDateFormat();
    setDateFormat(format);
  }, []);

  return (
    <DatePicker
      selected={selectedDate}
      onCalendarClose={FocusNextItem}
      onChange={onChange}
      tabIndex={0}
      placeholderText="Enter Date"
      className={currentDate ? 'form-control' : 'form-control placeholder'}
      wrapperClassName="datePicker"
      calendarClassName="calendar"
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
      popperPlacement="auto-start"
      popperClassName="popperDatePicker"
      dateFormat={dateFormat}
    />
  );
};

export default DateInput;

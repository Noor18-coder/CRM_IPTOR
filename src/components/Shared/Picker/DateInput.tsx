import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  currentDate?: string;
  onDateSelect: (key: string) => void;
}

const DateInput: React.FC<Props> = ({ currentDate, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onChange = (date: any) => {
    const formatDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(date);
    onDateSelect(formatDate);
  };

  React.useEffect(() => {
    if (currentDate) {
      setSelectedDate(new Date(currentDate));
    } else {
      setSelectedDate(new Date());
    }
  }, []);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      placeholderText="Enter Date"
      className="form-control"
      wrapperClassName="datePicker"
      calendarClassName="calendar"
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
      popperPlacement="auto-start"
      popperClassName="popperDatePicker"
    />
  );
};

export default DateInput;

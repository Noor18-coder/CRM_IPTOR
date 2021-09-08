import React from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


interface props {
    onDateSelect: (key:string) => void,
    id: string
}
 const DateInput:React.FC<props> = ({id, onDateSelect}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const onChange = (date:any ) => {
      const formatDate = moment(date).format('YYYY-MM-DD');
      setSelectedDate(date)
      onDateSelect(formatDate);  
};



    return (
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText="Enter Date"
        className={'form-control'}
        wrapperClassName="datePicker"
        calendarClassName="calendar"
        formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
        popperPlacement="auto-start"
        popperClassName="popperDatePicker"
      />
    );
    

}

export default DateInput;

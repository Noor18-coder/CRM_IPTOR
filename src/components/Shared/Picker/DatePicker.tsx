import React from 'react';
import moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

interface props {
    onDateSelect: (key:string) => void,
    id: string
}
 const DatePicker:React.FC<props> = ({id, onDateSelect}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      const value = e.currentTarget.value;
      const formatDate = moment(value).format('YYYY-MM-DD');
      onDateSelect(formatDate);  
};


  return (
    
    <TextField
        id={id}
        type="date"
        onChange={onChange}
        defaultValue={selectedDate}
        className={'form-control'}
        InputLabelProps={{
        shrink: true,
        }}
    />
    
  );
}

export default DatePicker;

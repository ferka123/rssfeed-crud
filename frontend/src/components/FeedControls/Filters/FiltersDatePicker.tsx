import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { Typography } from '@mui/material';

interface FormData {
  filterdate1: Date;
  filterdate2: Date;
}

const FiltersDatePicker = () => {
  const { control } = useFormContext<FormData>();
  const minDate = new Date('2023-04-05');
  const maxDate = new Date('2023-05-05');
  const [date1, setDate1] = useState(minDate);
  const [date2, setDate2] = useState(maxDate);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Typography color="primary" fontSize={20}>
          Filter by Date
        </Typography>
        <Controller
          name="filterdate1"
          control={control}
          defaultValue={date1}
          render={({ field }) => (
            <DatePicker
              value={date1}
              minDate={minDate}
              maxDate={date2}
              onChange={(val) => {
                field.onChange(val);
                setDate1(val!);
              }}
            />
          )}
        />
        <Controller
          name="filterdate2"
          control={control}
          defaultValue={date2}
          render={({ field }) => (
            <DatePicker
              value={date2}
              minDate={date1}
              maxDate={maxDate}
              onChange={(val) => {
                field.onChange(val);
                setDate2(val!);
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default FiltersDatePicker;

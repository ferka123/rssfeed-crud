import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../../redux/store';
import { useGetPostsQuery } from '../../../redux/api/endpoints/post';

interface FormData {
  filterdate1: Date;
  filterdate2: Date;
}

const FiltersDatePicker = () => {
  const { control } = useFormContext<FormData>();
  const feedOptions = useAppSelector((store) => store.feedState);
  const selectedDates = feedOptions.filterdate.split(',');
  const selected1 = selectedDates[0] ? new Date(selectedDates[0]) : undefined;
  const selected2 = selectedDates[1] ? new Date(selectedDates[1]) : undefined;
  const { data } = useGetPostsQuery(feedOptions);
  const minDate = data && new Date(data.minDate);
  const maxDate = data && new Date(data.maxDate);
  const [date1, setDate1] = useState(selected1 ?? minDate);
  const [date2, setDate2] = useState(selected2 ?? maxDate);

  useEffect(() => {
    if (feedOptions.filterdate === '') {
      setDate1(data && new Date(data.minDate));
      setDate2(data && new Date(data.maxDate));
    }
  }, [feedOptions, data]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Typography color="primary" fontSize={20}>
          Filter by Date
        </Typography>
        <Controller
          name="filterdate1"
          control={control}
          defaultValue={selected1 ?? minDate}
          render={({ field }) => (
            <DatePicker
              minDate={minDate}
              maxDate={date2}
              {...field}
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
          defaultValue={selected2 ?? maxDate}
          render={({ field }) => (
            <DatePicker
              minDate={date1}
              maxDate={maxDate}
              {...field}
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

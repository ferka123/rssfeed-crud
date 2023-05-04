import { Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetCreatorsQuery } from '../../../redux/api/endpoints/post';
import { setOptions } from '../../../redux/features/feedSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import FiltersDatePicker from './FiltersDatePicker';

interface FormData {
  filtercreator: string[];
  filterdate1: Date;
  filterdate2: Date;
}

const FiltersForm = () => {
  const methods = useForm<FormData>();
  const { data } = useGetCreatorsQuery();
  const intialCreators = useAppSelector((store) => store.feedState.filtercreator).split(',');
  const dispatch = useAppDispatch();

  const [selectedCreators, setSelectedCreators] = useState<string[]>(intialCreators);
  const creatorFormRegister = methods.register('filtercreator');

  const onSubmit = (data: FormData) => {
    const filterdate1 = new Date(data.filterdate1);
    const filterdate2 = new Date(data.filterdate2);
    const payload = {
      filterdate:
        filterdate1 instanceof Date && filterdate2 instanceof Date
          ? `${filterdate1.toISOString()},${filterdate2.toISOString()}`
          : '',
      filtercreator: data.filtercreator ? data.filtercreator.join(',') : '',
      page: 0
    };
    dispatch(setOptions(payload));
  };

  const handleReset = () => {
    dispatch(setOptions({ filterdate: '', filtercreator: '', page: 0 }));
    setSelectedCreators([]);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate style={{ padding: '20px' }}>
        <Stack gap={2}>
          <FormGroup sx={{ height: 280, overflowY: 'auto', flexWrap: 'nowrap' }}>
            <Typography color="primary" fontSize={20}>
              Filter by Creator
            </Typography>
            {data?.map((creatorName, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    {...creatorFormRegister}
                    onChange={(e) => {
                      const update = selectedCreators.filter((name) => name !== e.target.value);
                      if (e.target.checked) update.push(e.target.value);
                      setSelectedCreators(update);
                      creatorFormRegister.onChange(e);
                    }}
                    value={creatorName}
                    checked={selectedCreators.includes(creatorName)}
                  />
                }
                label={creatorName}
              />
            ))}
          </FormGroup>
          <FiltersDatePicker />
          <Stack flexDirection={'row'} justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleReset}>
              Clear
            </Button>
            <Button variant="contained" type="submit">
              Apply filters
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default FiltersForm;

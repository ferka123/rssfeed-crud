import { Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FiltersDatePicker from './FiltersDatePicker';

interface FormData {
  filtercreator: string[];
  filterdate1: Date;
  filterdate2: Date;
}

const tempData = [
  'John Doe',
  'Anna Doe',
  'Susan Clark',
  'Rachel Smith',
  'John Doe2',
  'Anna Doe2',
  'Susan Clark2',
  'Rachel Smith2'
];

const FiltersForm = () => {
  const methods = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate style={{ padding: '20px' }}>
        <Stack gap={2}>
          <FormGroup sx={{ height: '50%', overflowY: 'auto', flexWrap: 'nowrap' }}>
            <Typography color="primary" fontSize={20}>
              Filter by Creator
            </Typography>
            {tempData.map((creatorName, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox {...methods.register('filtercreator')} value={creatorName} />}
                label={creatorName}
              />
            ))}
          </FormGroup>
          <FiltersDatePicker />
          <Stack flexDirection={'row'} justifyContent="flex-end" gap={2}>
            <Button variant="outlined">Clear</Button>
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

import { Stack } from '@mui/system';
import Filters from './Filters/FiltersDrawer';
import SortInput from './SortInput/SortInput';

const FeedControls = () => {
  return (
    <Stack flexDirection={'row'} justifyContent={'flex-end'} width={'100%'} gap={3} height={40}>
      <SortInput />
      <Filters />
    </Stack>
  );
};

export default FeedControls;
